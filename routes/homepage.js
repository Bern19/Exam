//Declare modules
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');


//Router
const router = express.Router();

//Body Parser JSON
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//Login View
router.get('/', function(req, res, next){

  if(req.session){

    res.render('./homepage.html');

  } else {

    res.render('./crud/crud.html');

  }

  


});

//Login Query
router.post('/', urlencodedParser, function(req, res, next){

  var username = req.body.username;
  var password = req.body.password;

  var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "p@ssw0rd",
    database: "dbusers"
  });
  
  if(username && password){

    con.connect(function(err) {
      if (err) throw err;
      
      con.query('SELECT username, password FROM tblusers WHERE username=\'' + username + '\'  AND password = \'' + password + '\'' , function (err, result, fields) {
        if (err) throw err;
  
        if(result != 0){
  
          req.session.loggedin = true;
          req.session.username = username;
          
          res.redirect('/crud');

  
        } else {
          res.send('Incorrect Username or Password');
  
        }
      });
    });

  } else {
    res.send('Please enter Username and Password');
  }
  

});





module.exports = router;