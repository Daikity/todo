export * as usePassword from './makePassword'

export const createRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result: string = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const createDate = (time_zone: number) => {
    const date = new Date()
    const year = date.getFullYear(), 
          month = date.getMonth(), 
          day = date.getDate(),
          hour = date.getHours() + time_zone, 
          minute = date.getMinutes(),  
          second = date.getSeconds()

    return new Date(Date.UTC(year, month, day, hour, minute, second));
}