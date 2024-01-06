import { createUserValidation, passwordValidation } from "../utils/validations"
import { usePassword, createRandomString, createDate } from "../utils"
import { AuthData, DataResponse, Session, User } from "../types"
import GoogleAuth from '../utils/GoogleAuth'

const access_token = createRandomString(97)

const createSession = (user_id: string, token: string, expires_at: Date): boolean => {
    try {
        const sessions: Array<Session> = GoogleAuth.sessions
        const session = sessions.find((el: Session) => el.user_id === user_id);
        const users: Array<User> = GoogleAuth.usersData
        const user = users.find((el: User) => el.id === user_id)

        if (!user) {
            GoogleAuth.createSession({
                user_id: user_id,
                access_token: token,
                expires_at: new Date(expires_at.setDate(expires_at.getDate() + 10)),
            });
            return true
        } else if (session) {
            GoogleAuth.updateSession({
                user_id: user_id,
                access_token: token,
                expires_at: new Date(expires_at.setDate(expires_at.getDate() + 10)),
            });
            return true;
        }
        return false
    } catch (error) {
        console.error(error)
        return false
    }
}

export const userCreate = async (authData: AuthData): Promise<DataResponse> => {
    let authorizationData = authData

    if (!authorizationData) {
        return Promise.resolve({
            code: 404,
            field: "send_data",
            title: "Data error",
            message: "The sent data cannot be read"
        })
    }

    const checkUser = createUserValidation(authorizationData.login)
    const checkPassword = passwordValidation(authorizationData.password)

    if (!checkUser.isValid) {
        return Promise.resolve({
            field: "login",
            code: checkUser.code,
            title: checkUser.title,
            message: checkUser.message
        })
    }

    if (!checkPassword.isValid) {
        return Promise.resolve({
            field: "password",
            code: checkPassword.code,
            title: checkPassword.title,
            message: checkPassword.message
        })
    }
    else authorizationData.password = usePassword.createPassword(authorizationData.password)

    const newUser = {
        id: createRandomString(8),
        fullName: null,
        dateCreated: createDate(-3),
        sessionExpiresAt: null,
        age: null,
        mojo: null,
        todoListId: null,
        role: null,
    }

    const users = GoogleAuth.usersData
    const checkUserFound = createUserValidation(authorizationData.login, users)

    if (!checkUserFound.isValid) {
        return Promise.resolve({
            field: "login",
            code: checkUserFound.code,
            title: checkUserFound.title,
            message: checkUserFound.message
        })
    }

    const newUserSend: any = { ...authorizationData, ...newUser }

    const createUserRsp = await GoogleAuth.createUser(newUserSend)

    await createSession(newUser.id, access_token, createDate(24))
    return Promise.resolve({
        code: 200,
        field: 'create_user',
        title: 'Create user',
        message: 'User is successfully created',
        result: {
            server_response: createUserRsp,
            user_id: newUser.id,
            access_token,
            expires_at: createDate(24)
        }
    })
}
