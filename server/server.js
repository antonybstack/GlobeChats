const express = require("express");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const secretKey = process.env.SECRET_KEY;
const jwtMW = expressJWT({
    secret: secretKey,
    algorithms: ['HS256']
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*')
    next();
});

app.get('/hello', (req, res) => {
    res.send("Hello!");
});

app.listen(port, () => {
    console.log(`Express listening at port ${port}`);
});