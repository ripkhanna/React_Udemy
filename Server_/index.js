//Main starting point
const express = require('express'); //Parse respose routing
//import express from 'express';
const http = require('http'); // low-level request handling
const bodyParser = require( 'body-parser'); // help parse incoming http requests
const morgan = require( 'morgan'); // logging
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// db setup
mongoose.connect('mongodb://localhost/local');
//App setup
//Morgan login framework

app.use(morgan('combined'));
//body parser middleware parse to json
app.use(bodyParser.json({ type: '*/*'}));
router(app);
//


//Server setup
const port =process.env.port || 3090;
const server = http.createServer(app);
server.listen(port);

console.log('Server listening on' + port );
