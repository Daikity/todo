import { User } from "../types";

export const passwordValidation = (password: string) => {
    if (!Boolean(password)) {
        return { isValid: false, code: 404, title: "Data error", message: 'Password is invalid or not found'} 
    }
    if (password.split(' ').length - 1 > 0) {
        return { isValid: false, code: 500, title: "Password is invalid", message: 'the password must not contain spaces'} 
    }

    const uppers: boolean = /[A-Z]/.test(password);
    const lowers: boolean = /[a-z]/.test(password);
    const numbers: boolean = /\d/.test(password);
    const onlyLatin: boolean = /[A-Za-z\d]{6,}$/.test(password);

    if (!uppers) return { isValid: false, code: 500, title: "Password is invalid", message: "There must be at least one uppercase letter"}
    if (!lowers) return { isValid: false, code: 500, title: "Password is invalid", message: "There must be at least one lowercase letter "}
    if (!numbers) return { isValid: false, code: 500, title: "Password is invalid", message: "There must be at least one digit"}
    if (!onlyLatin) return { isValid: false, code: 500, title: "Password is invalid", message: "The password must be at least 6 characters long. The password uses only Latin letters and numbers."}

    return { isValid: true, code: 200, title: "Success", message: "Password is valid"}
}

export const userValidation = (user: string, users?: User[]) => {
    if (users) {
        if(users.find(({ login }) => login.toLowerCase() === user.toLowerCase())) {
            return { isValid: false, code: 404, title: "Data error", message: 'This login already exists'} 
        }
    }
    if (!Boolean(user)) {
        return { isValid: false, code: 404, title: "Data error", message: 'Login is invalid or not found'} 
    }
    if (user.split(' ').length - 1 > 0) {
        return { isValid: false, code: 500, title: "Login is invalid", message: 'The login must not contain spaces'} 
    }

    // if (user.indexOf('admin') !== -1) {
    //     return { isValid: false, code: 500, title: "Login is invalid", message: `You can't create an admin`}
    // }

    const onlyLatin = /^[A-Za-z\d]/.test(user);

    if (!onlyLatin) return { isValid: false, code: 500, title: "Login is invalid", message: "The login must contain only Latin letters and numbers."}

    return { isValid: true, code: 200, title: "Success", message: "Login is valid"}
}