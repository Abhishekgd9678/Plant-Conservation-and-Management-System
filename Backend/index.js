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

  // Prepare the SQL query with parameterized placeholders for plantinfo insertion
  const q = `INSERT INTO plantinfo (scientificname, age, commonname, location, expected_lifetime, count, userid)
             VALUES (?, ?, ?, ?, ?, ?, ?)`;

  // Execute the plantinfo insertion query with parameters
  db.query(q, [plantname, age, commonname, location, expectedlifetime, count, userid], (err, data) => {
    if (err) {
      console.error("Error while adding plant info:", err);
      // Send error response
      res.json({ error: "An error occurred while adding plant info" });
    } else {
      // Get the inserted plantid
      const plantid = data.insertId;
      res.json({ plantid: plantid });
    }
  });
});
app.get('/alldetails', (req, res) => {
  

  const q="select scientificname,age,commonname,expected_lifetime,location,plantid from plantinfo "
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error while adding plant info:", err);
    
      res.json({ error: "An error occurred while adding plant info" });
    } else {
    res.json(data);
    }
  });
});


app.post('/taxon', async (req, res) => {
  try {
    console.log(req.body);
    const { id, jsonData } = req.body;
    const { Kingdom, Family, Phylum, Class } = jsonData;

    // Insert taxon data into the database
    const taxonQuery = 'INSERT INTO taxon (kingdom, family, phylum, class, plantid) VALUES (?, ?, ?, ?, ?)';
    const taxonValues = [Kingdom, Family, Phylum, Class, id.plantid];
    await db.query(taxonQuery, taxonValues);

    // Insert climate_requirements data into the database
    const climateQuery = 'INSERT INTO climate_requirements (plantid) VALUES (?)';
    const climateValues = [id.plantid];
    await db.query(climateQuery, climateValues);

    console.log("Data insertion successful");
    res.json({ message: "Data insertion successful" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "An error occurred while inserting data" });
  }
});

app.post("/userplants",(req,res)=>{
  const q = `SELECT DISTINCT plantinfo.*, taxon.*
  FROM plantinfo
  JOIN taxon ON taxon.plantid = plantinfo.plantid
  WHERE plantinfo.userid = ${req.body.id}`;

  db.query(q,(err,data)=>{
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

app.post('/update',(req,res)=>{
  console.log(req.body);
  const sql = `UPDATE plantinfo
             SET commonname = ?,
                 age = ?,
                 expected_lifetime = ?,
                 location = ?,
                 count = ?
             WHERE plantid = ?`;

const values = [req.body.name, req.body.age, req.body.life, req.body.location, req.body.count, req.body.plantid];
 
db.query(sql, values, (err, result) => {
  if (err) {
    console.error('Error updating plantinfo:', err);
    // Handle error
  } else {
    console.log('Plantinfo updated successfully');
    // Handle success
    res.json({updated:true});
  }
});
})


app.post('/delete',(req,res)=>{
  const id = (req.body.plantid);
  const q = `DELETE FROM plantinfo WHERE plantid = ?; DELETE FROM taxon WHERE plantid = ?`;
  const values = [id,id];
  db.beginTransaction(err => {
    if (err) {
      console.error('Error beginning transaction:', err);
      // Handle error
      res.json({ error: 'An error occurred while beginning transaction' });
      return;
    }
  
    // Delete from plantinfo table
    const q1 = `DELETE FROM plantinfo WHERE plantid = ?`;
    db.query(q1, [id], (err1, result1) => {
      if (err1) {
        console.error('Error deleting from plantinfo:', err1);
        // Rollback transaction
        db.rollback(() => {
          console.error('Transaction rolled back');
          // Handle error
          res.json({ error: 'An error occurred while deleting from plantinfo' });
        });
        return;
      }
  
      // Delete from taxon table
      const q2 = `DELETE FROM taxon WHERE plantid = ?`;
      db.query(q2, [id], (err2, result2) => {
        if (err2) {
          console.error('Error deleting from taxon:', err2);
          // Rollback transaction
          db.rollback(() => {
            console.error('Transaction rolled back');
            // Handle error
            res.json({ error: 'An error occurred while deleting from taxon' });
          });
        } else {
          console.log('Rows deleted successfully');
          // Commit transaction
          db.commit(err => {
            if (err) {
              console.error('Error committing transaction:', err);
              // Handle error
              res.json({ error: 'An error occurred while committing transaction' });
            } else {
              console.log('Transaction committed');
              // Handle success
              res.json({ deleted: true });
            }
          });
        }
      });
    });
  });
})

app.post('/filter',(req,res)=>{
 
  const q=`select scientificname,age,commonname,location from plantinfo where location="${req.body.area}"  `;
  db.query(q,(err,data)=>{
    res.json(data);
  })
})

app.post('/adminprofile',(req,res)=>{
  const q = `select * from userdata`
  db.query(q,(err,data)=>{
    if(err){
      console.log(err);
      return ;
    }
    res.json(data);
  })
})

app.get('/adminmessage',(req,res)=>{
  const q = `select message,last_updated_userid,last_updated_plantid from admin where adminid=1`
  db.query(q,(err,data)=>{
    if(err){
      console.log(err);
    }
    else{
      res.json(data);
    }
  })
})

app.get('/adminmessagedone',(req,res)=>{
  const q = 'update admin set message=0 where adminid=1';
  db.query(q,(err,data)=>{
    if(err){
      console.log(err);
    }
    else{
      res.json({update:true})
    }
  })
})

app.post('/adminlog',(req,res)=>{
  console.log(req.body);
  const q = 'select 8 from userdata where gmail=? and password=?'
  const VALUES = [req.body.mail,req.body.password];
  db.query(q,VALUES,(err,data)=>{
    if(err){
      res.json({error:"error"});
    }
    else{
      res.json(true);
    }
  })
})

app.post('/plantdata',(req,res)=>{
  const q = `SELECT 
  pi.plantid,
  pi.scientificname,
  pi.age,
  pi.commonname,
  pi.location,
  pi.expected_lifetime,
  t.kingdom,
  t.family,
  t.phylum,
  t.class,
  cr.temperature,
  cr.soil_content,
  cr.humidity
FROM 
  plantinfo pi
JOIN 
  taxon t ON pi.plantid = t.plantid
JOIN 
  climate_requirements cr ON pi.plantid = cr.plantid
WHERE 
  pi.plantid = ?`;

  const values = [req.body.id];
  db.query(q,values,(err,data)=>{
    if(err){ 
      console.log(err);
      res.json({error:"error"});
    }
    else{
      res.json(data);
    }
  })
})

app.post('/updateuser',(req,res)=>{
  const q = "UPDATE userdata set username=?, password=? where userid=?" ;
  console.log(req.body);
  const values = [req.body.name, req.body.password,req.body.id];

  db.query(q,values,(err,data)=>{
    if(err){
      console.log("error",err);
      return ;
    }
    else{
      res.json({updated:true});
    }
  })
})

app.post('/highest',(req,res)=>{
  const q = `SELECT u.userid, u.username, u.email, COUNT(p.plantid) AS plant_count
  FROM userdata u
  JOIN plantinfo p ON u.userid = p.userid
  GROUP BY u.userid, u.username, u.email
  ORDER BY plant_count DESC
  LIMIT 1;`

  db.query(q,(err,data)=>{
    if(err){
      console.log(err);
    }
    else{
      res.json(data);
    }
  })
})

app.post('/gettaxon',(req,res)=>{
  console.log(req.body);
  const q = 'select * from taxon where plantid=?';
  const values = [req.body.id];

  db.query(q,values,(err,data)=>{
    if(err){
      console.log(err);
    }
    else{
      res.json(data);
    }
  })
})

app.post('/getclimate',(req,res)=>{
  const q = 'select * from climate_requirements where plantid = ?'
  
  db.query(q,[req.body.id],(err,data)=>{
    if(err)
      console.log(err);
    else{
      res.json(data);
    }
  })
})

app.post('/updateclimate', (req, res) => {
  console.log(req.body);
  const q = 'UPDATE climate_requirements SET sunlight = ?, humidity = ?, temperature = ? WHERE plantid = ?';
  const values = [req.body.sunlight, req.body.humidity, req.body.temperature, req.body.id];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ updated: false, error: err.message });
    } else {
      res.json({ updated: true });
    }
  });
});

app.post('/getuserplantdata',(req,res)=>{
  const {plantid,userid} = req.body ;
  db.query('CALL GetPlantInfoAndUserData(?, ?)', [plantid, userid], (err, results) => {
    if (err) {
      console.error('Error calling stored procedure:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Retrieve the result sets from the stored procedure
      const plantInfo = results[0];
      const userData = results[1];
      console.log(results);
      // Send the retrieved data as a JSON response
      res.json({ plantInfo, userData });
    }
  });
})

app.post('/addplantcount',(req,res)=>{
  const {count, userid, plantid} = req.body;
  const q = 'update userdata set plantid=?, needtoplant= ?, message=1 where userid=?';
  const values = [plantid, count,userid] ;
  db.query(q,values,(err,data)=>{
    if(err){
      console.log(err);
    }
    else{
      res.json({sent:true});
    }
  })
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
