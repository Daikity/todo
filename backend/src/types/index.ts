export interface DataResponse {
    field: string
    code: number
    title: string
    message: string
    dataError?: any
    result?: any
}

export interface AuthData {
    login: string
    password: string
}

export interface User {
    age:         number | null
    role:        string | null
    mojo:        string | null
    login:       string
    password:    string
    fullName:    string | null
    todoListId:  number | null
    dateCreated: Date
    lastSession: Date   | null
}