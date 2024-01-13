// backend.js

import cors from 'cors';
import express from 'express';
import mysql from 'mysql';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  database: 'plantdetails',
  host: 'localhost',
  password: 'Abhi9678@'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

app.post('/details', async (req, res) => {
  const { plantname, age, location } = req.body;
 
  const sql = `INSERT INTO plantinfo (plantname, area, age) VALUES ("${plantname}","${location}",${age})`;


  db.query(sql, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Sucessfully Added to the database");
    }
  });
});

app.get('/details', (req, res) => {
  const q = 'SELECT * FROM plantinfo';
  db.query(q, (err, data) => {
    res.json(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
