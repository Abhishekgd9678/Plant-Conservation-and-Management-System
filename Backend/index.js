import cors from 'cors';
import express from 'express';
import mysql from 'mysql';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  database: 'plants',
  host: 'localhost',
  password: 'Ajay@mysql'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});



app.post('/details', (req, res) => {
  const { plantname, commonname, age, count, location, expectedlifetime, userid } = req.body;
  
  // Prepare the SQL query with parameterized placeholders
  const q = `INSERT INTO plantinfo (scientificname, age, commonname, location, expected_lifetime, count, userid)
             VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  // Execute the query with parameters
  db.query(q, [plantname, age, commonname, location, expectedlifetime, count, userid], (err, data) => {
    if (err) {
      console.error("Error while adding plant info:", err);
      // Send error response
      res.json( "An error occurred while adding plant info");
    } else {
      // Send success response
      res.json(data.insertId);
    }
  });
});

app.post('/taxon',(req,res)=>{
  console.log(req.body);
  const {Kingdom,Family,Phylum,Class} = (req.body.jsonData);
  const id = req.body.id ;

  const taxonQuery = 'INSERT INTO taxon (kingdom, family, phylum, class,plantid) VALUES (?, ?, ?, ?, ?)';
  const taxonValues = [Kingdom, Family, Phylum, Class, id];
  db.query(taxonQuery, taxonValues, (error, results) => {
    if (error) {
      console.error("Error inserting taxon data:", error);
      throw error;
    }
    console.log("Taxon data inserted successfully:", results);
  });
})

app.post("/userplants",(req,res)=>{
  const q = `SELECT * from plantinfo, taxon where (taxon.plantid=plantinfo.plantid and userid=${req.body.id})`;

  db.query(q,(err,data)=>{
    console.log(data);
    res.json(data);
  })
})

app.post("/login", (req, res) => {
  if (req.body) {
      const email = req.body.mail;
      const password = req.body.password;
      const q = "SELECT * FROM userdata WHERE email = ? AND password = ?";
      db.query(q, [email, password], (err, results) => {
          if (err) {
              console.error("Error while logging in:");
              res.json("Internal server error");
          } else {
              if (results.length === 0) {
                  // No user found with the provided email and password
                  res.json("Invalid email or password" );
              } else {
                  // User found, login successful
                  res.json(results);
              }
          }
      });
  } else {
      res.status(400).json({ error: "Invalid request body" });
  }
});


app.post("/signup", (req, res) => {
  if (req.body) {
      const username = req.body.name;
      const email = req.body.mail;
      const password = req.body.password;

      const q = "INSERT INTO userdata (username, email, password) VALUES (?, ?, ?)";
      db.query(q, [username, email, password], (err, data) => {
          if (err) {
              console.error("Error while signing up:");
              if (err.code === 'ER_DUP_ENTRY') {
                  // Duplicate entry error for unique column (email)
                  res.json( "Email already exists" );
              } else {
                  // Other database error
                  res.json("Unable to sign up, please try again later" );
              }
          } else {
              // Sign-up successful
              res.json(data);
          }
      });
  } else {
      res.json({ error: "Invalid request body" });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
