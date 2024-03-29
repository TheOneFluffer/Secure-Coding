var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var user = require('../model/user.js');
var cors = require('cors');
var validator = require('validator');
var validateFn=require('../validation/validationFns');
var bcrypt=require('bcryptjs');
var verifyToken = require("../auth/verifyToken.js");



app.options('*', cors());
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use(bodyParser.json());
app.use(urlencodedParser);

app.get('/user/:userid',verifyToken.verifyAdmin, validateFn.validateUserid,function (req, res) {
    var id = req.params.userid;

    user.getUser(id, function (err, result) {
        if (!err) {
            validateFn.sanitizeResult(result);
            res.send(result);
        } else {

            res.status(500).send("Some error");
        }
    });
});

app.get('/user',verifyToken.verifyAdmin, function (req, res) {

    user.getUsers(function (err, result) {
       
        if (!err) {
            validateFn.sanitizeResult(result);
            res.send(result);
        } else {
            res.status(500).send(null);
        }
    });
});


//POST (INSERT) /user
app.post('/user',verifyToken.verifyAdmin ,validateFn.validateRegister, function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var role = "member";//req.body.role;

    const saltRounds = 10; //Set amount of salt rounds to 10

    /*user.insertUser(username, email, role, password, function (err, result) {

        res.type('json');
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);

        } else {
            res.status(200);
            res.send(`{"Record Inserted":"${result.affectedRows}"}`);
        }
    });*/

    bcrypt.hash(username, saltRounds, function (err, hashedUsername)
    {
        if (err)
        {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);
            return;
        }
    })

    bcrypt.hash(password, saltRounds, function (err, hashedPassword)
    {
        if (err)
        {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);
            return;
        }
    })

    user.insertUser(hashedUsername, email, role, hashedPassword, function (err, result) {

        res.type('json');
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);

        } else {
            res.status(200);
            res.send(`{"Record Inserted":"${result.affectedRows}"}`);
        }
    });

});


app.delete('/user/:userid', verifyToken.verifyAdmin, validateFn.validateUserid, function (req, res) {

    var userid = req.params.userid;

    user.deleteUser(userid, function (err, result) {

        res.type('json');
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);

        } else {
            res.status(200);
            res.send(`{"Record(s) Deleted":"${result.affectedRows}"}`);
        }

    });

});


//POST (LOGIN) /user/login
app.post('/user/login',function(req,res){
    var email=req.body.email;
    var password=req.body.password;

    user.loginUser(email,password,function(err,result){

        res.type("json");
        if(err || result==null){
            res.status(500);
            res.send(`{"Message":"Logged in Fail"}`);
        }else{
            res.status(200);
            res.send(`{"Token":"${result}"}`);

        }

    });

});


module.exports = app;