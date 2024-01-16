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



app.get('/details', (req, res) => {
  const q = 'SELECT * FROM plantdata t1 JOIN userinfo t3 ON t1.userID = t3.userID JOIN taxon t2 ON t1.Taxon_id = t2.Taxon_id;';
  db.query(q, (err, data) => {
    res.json(data);
  });
});

app.post('/filter',(req,res)=>{
  const q = `SELECT * FROM plantdata where location="${req.body.area}"`
  db.query(q,(err, data)=>{
    res.json(data);
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
