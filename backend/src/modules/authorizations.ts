import { createRandomString, createDate } from "../utils"
import { passwordAuthValid, userAuthValid } from "../utils/validations"
import { AuthData, DataResponse, Session, User } from "../types"
import GoogleAuth from '../utils/GoogleAuth'

const access_token = createRandomString(97)

const createSession = async (user_id: string, token: string, expires_at: Date): Promise<boolean> => {
    try {
        const sessions: Array<Session> = GoogleAuth.sessions
        const session = sessions.find((el: Session) => el.user_id === user_id);

        if (!session) {
            await GoogleAuth.createSession({
                user_id: user_id,
                access_token: token,
                expires_at: new Date(expires_at.setDate(expires_at.getDate() + 10)),
            });
            return true
        } else {
            await GoogleAuth.updateSession({
                user_id: user_id,
                access_token: token,
                expires_at: new Date(expires_at.setDate(expires_at.getDate() + 10)),
            });
            return true;
        }
    } catch (error) {
        console.error(error)
        return false
    }
}

export const authorizations = async (authData: AuthData): Promise<DataResponse> => {
    const users = GoogleAuth.usersData
    const user: User | undefined = users.find((el: User) => el.login === authData.login);
    console.table(users);

    const checkUser = userAuthValid(authData.login, users);
    const checkPassword = passwordAuthValid(authData.password, user);
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

    await createSession(user?.id || '', access_token, createDate(24))

    return Promise.resolve({
        code: 200,
        field: 'user_authorization',
        title: 'User authorization',
        message: 'The user has successfully logged in',
        result: GoogleAuth.sessions.find((el: Session) => el.user_id === user?.id)
    })
}
