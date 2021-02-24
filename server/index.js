const express = require('express');

console.log('Server is starting...');

require('dotenv/config')
const dotenv = require('dotenv');
dotenv.config();


//
const createRoutes = require('./core/routes');
require('./core/db');

console.log('mongoose connected!');
const app = express();

const server = require('http').createServer(app);
createRoutes(app);

server.listen(process.env.PORT, ()=>{
    console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});









