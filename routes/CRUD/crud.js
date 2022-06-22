//Declare modules
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const {v4: uuidv4 } = require('uuid');


//Router
const router = express.Router();

//Body Parser JSON
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//Crud page route
router.get('/', function(req,res,next){

    if(req.session){

        res.render('./crud/crud.html');

    } else {

        res.redirect('/')

    }
    
    

});


//fetching users data route
router.get('/getUsers', function(req,res,next){

    if(req.session){

        var con = mysql.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "p@ssw0rd",
            database: "dbusers"
          });
          
          
        con.connect(function(err) {
            if (err) throw err;
            
            con.query('SELECT * FROM tblusers', function (err, result, fields) {
            if (err) throw err;
            
                var arrData = [];
    
                
                for(let i = 0; i < result.length; i++){
    
    
                    var data = {
                        "userid": result[i].userid,
                        "uuid": result[i].uuid,
                        "firstname": result[i].firstname,
                        "lastname": result[i].lastname,
                        "address": result[i].address,
                        "postcode": result[i].postcode,
                        "mobileno": result[i].mobileno,
                        "email": result[i].email,
                        "actions": '<a class="fa fa-edit fa-lg rowEdit" role="button"></a>'
                                +  ' &nbsp;&nbsp' + '<a class="fa fa-trash fa-lg rowDelete" style="color: red;" role="button"></a>'
                    };
    
                    arrData.push(data);
    
                }
    
                res.send({"data": arrData});
            
            });
        });

    } else {

        res.redirect('/');
    }
    
    
});


//Fetching user data for editing Route
router.post('/getUserInfo', urlencodedParser, function(req,res,next){

    if(req.session){

        var reqUuid = req.body.uuid;
    var arrData = [];

    
    var con = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "p@ssw0rd",
        database: "dbusers"
      });
      
      
    con.connect(function(err) {
        if (err) throw err;
        
        con.query('SELECT * FROM tblusers WHERE uuid = \'' + reqUuid + '\'', function (err, result, fields) {
        
            if(err){

                res.status(400);
                res.send('Bad Request');
                console.log(err);

            } else {

            for(let i = 0; i < result.length; i++){


                var data = {
                    "userid": result[i].userid,
                    "uuid": result[i].uuid,
                    "firstname": result[i].firstname,
                    "lastname": result[i].lastname,
                    "address": result[i].address,
                    "postcode": result[i].postcode,
                    "mobileno": result[i].mobileno,
                    "email": result[i].email,
                    "username": result[i].username,
                    "password": result[i].password
                };

                arrData.push(data);
                

            }
            

            res.send({"data": arrData});

            }
        });
    });


    } else {

        res.redirect('/');
    }

    
});

//Add user Route
router.post('/addUser', urlencodedParser, function(req,res,next){
    

    if(req.session){

        var reqUserId = req.body.userid;
        var reqFirstName = req.body.firstname;
        var reqLastName = req.body.lastname;
        var reqAddress = req.body.address;
        var reqPostCode = req.body.postcode;
        var reqMobile = req.body.mobile;
        var reqEmail = req.body.email;
        var reqUsername = req.body.username;
        var reqPassword = req.body.password;

        
        var con = mysql.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "p@ssw0rd",
            database: "dbusers"
        });
        
        
        con.connect(function(err) {
            if (err) throw err;
            
            con.query('INSERT INTO tblusers VALUES(' + reqUserId + ', \'' + uuidv4() + '\', \'' + reqUsername + '\', \'' + reqPassword + '\', \'' + reqFirstName + '\', \'' + reqLastName + '\', \'' + reqAddress + '\', \'' + reqPostCode + '\', \'' + reqMobile + '\', \'' + reqEmail + '\')', function (err, result, fields) {
            
                if(err){
                    res.status(400);
                    res.send('Error');
                    console.log(err);

                } else {
                    res.status(200);
                    res.send('OK')
                }

            });
        });


    } else {

        res.redirect('/');
    }

    
});

//Edit user data route
router.post('/editUserInfo', urlencodedParser, function(req,res,next){


    if(req.session){

        var reqUserId = req.body.userid;
        var reqUuid = req.body.uuid;
        var reqFirstName = req.body.firstname;
        var reqLastName = req.body.lastname;
        var reqAddress = req.body.address;
        var reqPostCode = req.body.postcode;
        var reqMobile = req.body.mobile;
        var reqEmail = req.body.email;
        var reqUsername = req.body.username;
        var reqPassword = req.body.password;
    
        
        var con = mysql.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "p@ssw0rd",
            database: "dbusers"
          });
          
          
        con.connect(function(err) {
            if (err) throw err;
            
            con.query('UPDATE tblusers SET userid = \'' + reqUserId + '\', username = \'' + reqUsername + '\', password = \'' + reqPassword + '\', firstname = \'' + reqFirstName + '\', lastname = \'' + reqLastName + '\', address = \'' + reqAddress + '\', postcode = \'' + reqPostCode + '\', mobileno = \'' + reqMobile + '\', email = \'' + reqEmail + '\' WHERE uuid = \'' + reqUuid + '\'', function (err, result, fields) {
            
            if(err){
                res.status(400);
                res.send('Error');
                console.log(err);
    
            } else {
                res.status(200);
                res.send('OK')
            }
    
            
            
            });
        }); 

    } else {

        res.redirect('/');
    }

    
    


});


//Edit user data route
router.post('/deleteUser', urlencodedParser, function(req,res,next){

    if(req.session){

        var reqUuid = req.body.uuid;

        var con = mysql.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "p@ssw0rd",
            database: "dbusers"
        });
        
        
        con.connect(function(err) {
            if (err) throw err;
            
            con.query('DELETE FROM tblusers WHERE uuid = \'' + reqUuid + '\'', function (err, result, fields) {
            
                if(err){
                    res.status(400);
                    res.send('Error');
                    console.log(err);

                } else {
                    res.status(200);
                    res.send('OK')
                }

            });
        });

    } else {

        res.redirect('/');
    }

    
});

module.exports = router;