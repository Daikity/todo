import { writeFileSync, readFileSync } from "node:fs"
import { userValidation, passwordValidation } from "../utils/validations"
import { usePassword, createRandomString, createDate } from "../utils"
import { AuthData, DataResponse } from "../types"
import bd_files from "../modules/bd_files"

const access_token = createRandomString(97)

export const userCreate = (authData: AuthData): Promise<DataResponse> => {
    let authorizationData = authData

    if(!authorizationData) {
        return Promise.resolve({
            code: 404,
            field: "send_data",
            title: "Data error",
            message: "The sent data cannot be read"
        })
    }

    const checkUser = userValidation(authorizationData.login)
    const checkPassword = passwordValidation(authorizationData.password)

    if (!checkUser.isValid) {
        return Promise.resolve({
            field: "login",
            code: checkUser.code,
            title: checkUser.title,
            message: checkUser.message
        })
    } 

    if(!checkPassword.isValid) {
        return Promise.resolve({
            field: "password",
            code: checkPassword.code,
            title: checkPassword.title,
            message: checkPassword.message
        }) 
    }
    else authorizationData.password = usePassword.createPassword(authorizationData.password)

    let statusFile = 200
    let fileData: any;
    try {
        fileData = readFileSync(bd_files.users_data_file, "utf8")
    } catch (error: any) {        
        if (error.errno === -4058) {
            statusFile = 404
        } else statusFile = 500
    }

    const newUser = {
        id: createRandomString(8),
        fullName: null,
        dateCreated: createDate(-3),
        lastSession: null,
        age: null,
        mojo: null,
        todoListId: null,
        role: null,
    }
    
    if (statusFile === 404) {
        try {
            writeFileSync(bd_files.users_data_file, JSON.stringify([{...authorizationData, ...newUser}]))
            createSession(newUser.id, access_token, createDate(24))
            return Promise.resolve({
                code: 200,
                field: 'create_user', 
                title: 'Create user', 
                message: 'User is successfully created',
                result: {
                    access_token: access_token,
                    expires_at: newUser.dateCreated
                }
            })
        } catch (error) {
            return Promise.resolve({
                field: "create_user",
                code: 500,
                title: 'Create user error',
                message: 'An error occurred when creating a user',
                dataError: error
            })
        }
    } else {
        const users = JSON.parse(fileData as string)
        const checkUserFound = userValidation(authorizationData.login, users)

        if (!checkUserFound.isValid){
            return Promise.resolve({
                field: "login",
                code: checkUserFound.code,
                title: checkUserFound.title,
                message: checkUserFound.message
            })
        } 

        users.push({...authorizationData, ...newUser})

        try {
            writeFileSync(bd_files.users_data_file, JSON.stringify(users))
            createSession(newUser.id, access_token, createDate(24))
            return Promise.resolve({
                code: 200,
                field: 'create_user', 
                title: 'Create user', 
                message: 'User is successfully created',
                result: {
                    access_token: access_token,
                    expires_at: createDate(24)
                }
            })
        } catch (error) {
            return Promise.resolve({
                field: "create_user",
                code: 500,
                title: 'Create user error',
                message: 'An error occurred when creating a user',
                dataError: error
            })
        }
    }
}

export const createSession = (user_id: string, token: string, expires_at: Date): boolean => {
    try {
        const users_file = readFileSync(bd_files.users_data_file, "utf8")
        let sessions_file;
        try {
            sessions_file = readFileSync(bd_files.sessions_file, "utf8")
        } catch (e) {
            writeFileSync(bd_files.sessions_file, JSON.stringify([]))
            sessions_file = readFileSync(bd_files.sessions_file, "utf8")
        }
        
        const sessions = JSON.parse(sessions_file as string) as Array<any>
        const users = JSON.parse(users_file) as Array<any>
        const user = users.find((el: any) => el.id === user_id)
        if (user) {
            const other_sessions = sessions.filter((el: any) => el.user_id !== user_id)
            const newSession = {
                user_id: user_id,
                access_token: token,
                expires_at: expires_at
            }
            other_sessions.push(newSession)
            writeFileSync(bd_files.sessions_file, JSON.stringify(other_sessions))
            return true
        }
        return false
    } catch (error) {
        writeFileSync(bd_files.log_file, '/n' + error)
        console.error(error)
        return false
    }
}