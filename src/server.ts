import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose'
import router from './router'
import config from './config/config';


// This to put in .env 
// MONGO_URL in index.ts
// SECRET_KEY in ./helpers/index
// not yet done putting to .env
const app = express();

app.use(cors({
    credentials: true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const host = '192.168.1.32';
const port = 8080;
server.listen(port,host, ()=>{
    console.log(`Server is running on http://${host}:${port}`);
})


// const MONGO_URL = 'mongodb+srv://rjcabalda:macie040921@cluster0.9wlmdtk.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(config.mongo.url,config.mongo.options);
mongoose.connection.on('error',(error: Error)=> console.log('mongo connection failed: ',error));

app.use('/',router());

