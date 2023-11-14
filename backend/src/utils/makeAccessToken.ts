export const getAccessToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result: string = '';
    for (let i = 0; i < 96; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}