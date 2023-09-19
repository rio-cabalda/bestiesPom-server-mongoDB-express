import crypto from 'crypto'
const bcrypt = require('bcrypt');
// Change this crypto to bcrypt

const SECRET_KEY = 'RIOCABALDA-REST-API-hash123';

export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt,password].join('/')).update(SECRET_KEY).digest('hex');
}