const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'root', // Replace with your MySQL password
  database: 'umsdb'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/post', (req, res) => {
    const {username,password, email } = req.body;
    const sql = 'INSERT INTO users (username,password, email) VALUES (?,?, ?)';
    db.query(sql, [username,password, email], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({
        id: results.insertId,
        username,
        password,
        email
      });
    });
  });

// Create an endpoint to get all
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });






/*
var express = require("express");
var mysql = require("mysql2");
var app = express();
app.use(express.json);

const con=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'umsdb'
})

con.connect((err) => {
    if (err) {
        console.log(err);
    }else{
        console.log("connected!!")
    }
})

app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });


app.post('/post',(req,res)=>{
    const id = req.body.id;
    const username = req.body.username;
    const password = reg.body.password;
    const email = req.body.email;
    

    con.query('insert into users values(?,?,?,?)',[id,username,password,email],(err,result)=>{
        if (err) {
            res.send(err)
        }else{
            res.send('Posted')
        }
    })
})

app.listen(3000,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("on port 3000")
    }
}) */