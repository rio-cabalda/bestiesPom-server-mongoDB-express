require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
import router from'./router';
import config from './config/config';

const app = express();

app.use(cors({
    credentials: true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

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

