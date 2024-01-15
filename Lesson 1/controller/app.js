//Name: Lau Hong Wei
//Class: DISM/FT/2B/24
//Admin number: 2241319
var express = require('express');
var bodyParser = require('body-parser');

//Import databases from /models
const categoryDB = require('../models/categoryMenu');
const productDB = require('../models/productMenu');

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json()); //parse appilcation/json data
app.use(urlencodedParser); //parse json data

//Webservice endpoints
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Endpoint 1
app.get('/product', function (req, res) // Completed
{
    //processing
    productDB.getProduct(function (err, results) {
        if (err) {
            console.log("err");
            res.status(500);
            res.type("json");
            res.send(`{"Message":"Internal Server Error"}`);
        }
        else {
            res.status(200);
            res.type("json");
            res.send(results);
        }
    });
});


app.get('/category', function (req, res) // Completed
{
    //processing
    categoryDB.getCategory(function (err, results) {
        if (err) {
            console.log("err");
            res.status(500);
            res.type("json");
            res.send(`{"Message":"Internal Server Error"}`);
        }
        else {
            res.status(200);
            res.type("json");
            res.send(results);
        }
    });
});


//Endpoint 2
app.post('/product', function (req, res) //Somewhat complete, needs some more tweaking
{
    //retrieve user input
    var name = req.body.name;
    var description = req.body.description;
    var brand = req.body.brand;
    var categoryID = req.body.categoryID;
    var imageurl = req.body.imageurl;

    productDB.addProduct(name, description, brand, categoryID, imageurl, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type("json");
            res.send({ "Message": "Some error encountered!" });
        }

        else {
            res.status(201);
            res.type("json");
            res.send("Product has been added!");
        }
    });
})


//Endpoint 3
app.put('/product/:productid', function (req, res) {
    //retrieve user input
    var name = req.body.name;
    var description = req.body.description;
    var brand = req.body.brand;
    var categoryID = req.body.categoryID;
    var imageurl = req.body.imageurl;
    var productid = req.params.productid;

    productDB.editProduct(name, description, brand, categoryID, imageurl, productid, function (err, results) {
        if (!err) {
            console.log("Category added successfully");
            res.status(200).type("application/json").json(results);
        } else {
            console.error(err);
            res.status(500).type("application/json").json({ error: "Internal Server Error" });
        }
    });
});



//Endpoint 4
app.delete('/product/:productid', function (req, res) //Completed
{
    //retrieve user input
    var productid = req.params.productid;

    productDB.deleteProduct(productid, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type("json");
            res.send({ "Message": "Internal Server Error" });
        }

        else {
            res.status(201);
            res.type("json");
            res.send("Product has been deleted!");
        }
    });
})
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = app;