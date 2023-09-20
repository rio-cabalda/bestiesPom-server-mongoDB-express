require('dotenv').config()

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    autoIndex: false,
    retryWrites: true
};

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_URL;

const MONGO = {
    options: MONGO_OPTIONS,
    uri: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
}

const SERVER_PORT = process.env.SERVER_PORT;

const SERVER = {
    port: SERVER_PORT
};

const config = {
    mongo: MONGO,
    server: SERVER
}

export default config;