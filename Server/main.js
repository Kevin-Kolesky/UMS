const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require("cors");

const corsOptions = {
  origin: "http://127.0.0.1:5500",
};

const app = express();
app.use(cors(corsOptions));

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


app.post('/api/post', async (req, res) => {
    const {username,password, email } = req.body;
    const hash = await bcrypt.hash(password, 13);
    const sql = 'INSERT INTO users (username,password, email) VALUES (?,?,?)';
    db.query(sql, [username,hash, email], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({
        id: results.insertId,
        username,
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

app.post('/api/userCheck', (req, res) => {
  const {password,email} = req.body;

  const sql = 'SELECT password FROM users WHERE email=?';
  db.query(sql,[email], async (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (result.length === 0){
      return res.status(404).send('email not found');
    }

     const data = JSON.parse(JSON.stringify(result));

      try {
        const match = await bcrypt.compare(password, data[0].password); 
        
        if (match){
         return res.status(200).send(true);
        }else{
         return res.status(401).send(false);
        } 
      }
      catch (error) {
        return res.status(500).send(error.message);
      }
  });
})

app.get('/api/usersById', (req, res) => {
  const id = req.body;
  const sql = 'SELECT * FROM users WHERE id=?';
  db.query(sql,id, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }else{
      return res.json(result);
    }
  });
});


app.put('/api/update/:id', async (req, res) => {
  const id=req.params.id;
  const {username,password, email } = req.body;
  const hash = await bcrypt.hash(password, 13);

  const sql = 'UPDATE users SET username=?,password=?,email=? WHERE id=?;';
  db.query(sql,[username,hash,email,id],(err, result) => {
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

app.delete('/api/delete/:id', (req, res) => {
  const id=req.params.id;
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