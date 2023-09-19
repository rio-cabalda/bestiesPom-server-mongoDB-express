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

// const host = '192.168.1.32';
const port = 8080;

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(config.mongo.url);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  connectDB().then(() => {
    server.listen(port, () => {
        console.log("listening for requests");
    })
})

app.use('/',router());

