const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const session = require("express-session");
var fs = require('fs');
const multer = require('multer');

Grid.mongo = mongoose.mongo;
var gfs;
/* =======================
    LOAD THE CONFIG
==========================*/
const config = require("./config");


/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express();


app.set('view engine', 'jade');
app.use(
    session({
        secret: "1@%24^%$3^*&98&^%$", // 쿠키에 저장할 connect.sid값을 암호화할 키값 입력
        resave: false, //세션 아이디를 접속할때마다 새롭게 발급하지 않음
        saveUninitialized: true //세션 아이디를 실제 사용하기전에는 발급하지 않음
    })
);

// parse JSON and url-encoded query
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// print the request log on console
app.use(morgan("dev"));

// set the secret key variable for jwt
app.set("jwt-secret", config.secret);

// index page, just for testing

// index page, just for testing
app.get("/", (req, res) => {
    res.send("fuck you android");
});

// configure api router
app.use("/api", require("./routes/api"));

// open the server
app.listen(3001, () => {
    console.log(`Express is running on port 3001`);
});

/* =======================
    CONNECT TO MONGODB SERVER
==========================*/

mongoose.connect(config.mongodbUri_userdata);
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
    console.log("connected to mongodb server");
});