const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
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


app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(result);
    });
  });

app.get('/api/usersById', (req, res) => {
  const id = req.body;
  const sql = 'SELECT * FROM users WHERE id=?';
  db.query(sql,id, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }else{
      const data=JSON.parse(JSON.stringify(result));
      console.log(data[0].id);
      console.log(data[0].username);
      console.log(data[0].password);
      console.log(data[0].email);
      res.json(result);

    }
    
  });
});


app.put('/api/update/:id', (req, res) => {
  const id=req.params.id;
  const {username,password, email } = req.body;

  const sql = 'UPDATE users SET username=?,password=?,email=? WHERE id=?;';
  db.query(sql,[username,password,email,id],(err, result) => {
    if (err) {
      return res.status(500).send(err);
    }else{
      if (result.affectedRows==0){
        res.send("id not found in table");
      }else{
        res.send("updated");
      }
    }
  });
});

app.delete('/api/delete/', (req, res) => {
  const id=req.body.id;
  const sql = 'DELETE FROM users WHERE id=?';
  db.query(sql,id,(err, result) => {
    if (err) {
      return res.status(500).send(err);
    }else{
      if (result.affectedRows==0){
        res.send("id not found in table");
      }else{
        res.send("deleted");
      }
    }
  });
});


app.listen(process.env.PORT, () => console.log('app is running'));