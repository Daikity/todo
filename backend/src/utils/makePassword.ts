import * as crypto from 'crypto';
import { Buffer } from 'node:buffer'
import { env } from './configs'

const algorithm: string = 'aes-256-cbc';
const cryptoKey: string = env.CRYPTO_SECRET_KEY as string;
const cryptoIv: string = env.CRYPTO_IV as string;

const initVector = Buffer.from(cryptoIv, 'utf-8')
const securityKey = Buffer.from(cryptoKey, 'utf-8')


if (!cryptoKey) {
    throw new Error('CRYPTO_SECRET_KEY is required')
}

const createPassword = (password: string) => {
    const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);
    let encryptedText = cipher.update(password, 'utf8', 'hex');
    return encryptedText += cipher.final('hex');
}
const getPassword = (password: string) => {
    const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
    let decryptedText = decipher.update(password, 'hex', 'utf8');
    return decryptedText += decipher.final('utf8');
}

export { createPassword, getPassword }