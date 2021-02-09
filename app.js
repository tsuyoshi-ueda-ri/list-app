const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'list_app'
});
app.get('/',(req, res) => {
  res.render('top.ejs');
});

app.get('/index',(req, res) => {
  connection.query(
    'SELECT*FROM items',
    (error,results) => {
      res.render('index.ejs',{items: results})
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  console.log(req.body.itemName);
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      res.render('index.ejs', {items: results});
    }
  );
});

app.listen(3000);