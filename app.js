//Declare required modules
const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');

app.use(session(
  { secret: "secret", maxAge: 30000, resave: true, saveUninitialized: true
  }));

//Listening Port
const port = 3000;


//ejs
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);


//Declare Routes
const crud = require('./routes/crud/crud');
const homepage = require('./routes/homepage');

//Declare Bootstrap
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

//Declare Datatables and their extras
app.use('/datatable', express.static(__dirname + '/node_modules/datatables.net/js'));
app.use('/datatable-dt', express.static(__dirname + '/node_modules/datatables.net-dt/css'));

app.use('/datatable-buttons', express.static(__dirname + '/node_modules/datatables.net-buttons/js'));
app.use('/datatable-buttons-dt', express.static(__dirname + '/node_modules/datatables.net-buttons-dt/css'));

app.use('/datatable-responsive', express.static(__dirname + '/node_modules/datatables.net-responsive/js'));
app.use('/datatable-responsive-dt', express.static(__dirname + '/node_modules/datatables.net-responsive-dt/css'));

app.use('/datatable-select', express.static(__dirname + '/node_modules/datatables.net-select/js'));
app.use('/datatable-select-dt', express.static(__dirname + '/node_modules/datatables.net-select-dt/css'));


//Declare Font-Awesome
app.use('/font-awesome', express.static(__dirname + '/public/font-awesome-4.7.0/css'));
app.use('/fonts', express.static(__dirname + '/public/font-awesome-4.7.0/fonts'));

//Declare Jquery
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

//Use the Routes
app.use('/crud', crud);
app.use('/', homepage);




//Logout Route
app.post('/logout', function(req, res, next){

  req.session.destroy(err => {
    if(err) {
         console.log(err)
     }else{
         res.redirect('/');
     }
});
  

})


app.listen(port, () => {
  console.log(`CRUD application listening on port ${port}`)
})