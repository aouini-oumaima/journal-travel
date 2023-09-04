const express = require('express');
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser'); 
const PORT = 5000;
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  connection  = require('./db/index');

app.use(cors());
app.use(bodyParser.json()); 



app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/sharedexperiences", (req, res) => {
  const q = "SELECT * FROM experience";
  connection.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

app.get('/experience/:eID', (req, res) => {
  const { eID } = req.params;
  connection.query(
    'SELECT * FROM experience WHERE eID = ?', [eID], function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json(err); 
      } else {
        res.json(result[0]);
      }
    }
  );
});

app.post("/experience", (req, res) => {
  const insertQuery = "INSERT INTO experience( `title`, `description`, `location`,  `image_url`,`category`) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
   
    req.body.title,
    req.body.description,
    req.body.location,
    req.body.image_url,
    req.body.category
  ];

  connection.query(insertQuery, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err); 
    }
    res.send("post added");
  });
});




app.delete("/experience/:eID", (req, res) => {
  const eID = req.params.eID; 
  const q = "DELETE FROM experience WHERE eID = ?";

  connection.query(q, [eID], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err); 
    }
    res.json(data);
  });
});

app.put("/experience/:eID", (req, res) => {
  const eID = req.params.eID; 
  const q = "UPDATE experience SET `userID` = ?, `title` = ?, `description` = ?, `location` = ?,  `image_url` = ?, `created_at` = ? `category`=? WHERE eID = ?";

  const values = [
    req.body.userID,
    req.body.title,
    req.body.description,
    req.body.location,
    // req.body.date,
    req.body.image_url,
    req.body.created_at,
  ];

  connection.query(q, [...values, eID], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err); 
    }
    res.json(data);
  });
});


//comments 
app.get('/comments/:idcomments/comments', (req, res) => {
  const idcomments = req.params.idcomments;
  connection.query(
    'SELECT * FROM comments WHERE idcomments = ?',
    [idcomments],
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send('Error fetching comments for post');
      } else {
        res.send(result);
      }
    }
  );
});



app.post('/comments/:idcomments/comments', (req, res) => {
  const postId = req.params.idcomments; 
  const commentBody = req.body.comment; 

  connection.query(
    'INSERT INTO comments (idcomments, comment) VALUES (?, ?)',
    [postId, commentBody],
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send('Error adding comment to post');
      } else {
        res.send('Comment added to post');
      }
    }
  );
});



////////

//logg
app.post('/login/post', (req, res) => {
  const { name, email, password } = req.body;
  connection.query("INSERT INTO users SET ?",
    { name, email, password },
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err); 
      }
      res.send("user added");
    }
  );
});

app.get('/users', (req, res) => {
  connection.query(
    'SELECT * FROM users',
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json(err); 
      }
      res.send(result);
    }
  );
});


app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error('Error hashing password:', hashErr);
      return res.status(500).json({ error: 'Registration failed' });
    }

    const insertQuery = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    connection.query(insertQuery, [username, hashedPassword, email], (err, result) => {
      if (err) {
        console.error('MySQL insertion error:', err);
        return res.status(500).json({ error: 'Registration failed' });
      }
      console.log('User registered successfully');
      res.status(201).json({ message: 'Registration successful' });
    });
  });
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const selectQuery = 'SELECT * FROM users WHERE email = ?';
  connection.query(selectQuery, [email], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const user = rows[0];
    bcrypt.compare(password, user.password, (compareErr, isMatch) => {
      console.log('Compare Error:', compareErr);
      console.log('Is Match:', isMatch);
      if (compareErr) {
        console.error('Error comparing passwords:', compareErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      res.status(200).json({ message: 'Login successful' });
    });
  });
});

app.get('/profile', (req, res) => {
  const { email } = req.query;

  const selectQuery = 'SELECT userID, username, email FROM users WHERE email = ?';
  connection.query(selectQuery, [email], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const userProfile = rows[0];
    res.json({ status: 'success', user: userProfile });
  });
});



app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`));