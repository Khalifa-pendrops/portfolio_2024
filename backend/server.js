import express from "express";
// import mysql from "mysql2";
import { Pool } from "pg";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// const db = mysql.createConnection({
//   host: process.env.DB_HOST || "sql311.infinityfree.com",
//   user: process.env.DB_USER || "fi_37957801",
//   password: process.env.DB_PASSWORD || "1RL3UHVsliJkW4X",
//   database: process.env.DB_NAME || "ifi_37957801_portfolio",
//   port: process.env.DB_PORT || 3306,
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err.stack);
//     return;
//   }
//   console.log("Connected to the MySQL database");
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.post("/submissions", (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).send("Email and message are required");
  }

  // const checkQuery = "SELECT * FROM form_submissions WHERE email = ?";
  // db.query(checkQuery, [email], (err, results) => {
  //   if (err) {
  //     console.error("Error checking email: ", err.message);
  //     return res.status(500).send("Error processing request");
  //   }

  //   if (results.length > 0) {
  //     return res.status(409).json({
  //       message: "Email already exists",
  //     });
  //   }
  //   const insertQuery =
  //     "INSERT INTO form_submissions (email, message) VALUES (?, ?)";

  //   db.query(insertQuery, [email, message], (err, result) => {
  //     if (err) {
  //       console.error("Error inserting data:", err.message);
  //       return res.status(500).send("Error saving submission");
  //     }
  //     res.status(200).json({
  //       message: "Submission saved!",
  //       id: result.insertId,
  //     });
  //   });
  // });

  const query = "INSERT INTO form_submissions (email, message) VALUES (?, ?)";

  db.query(query, [email, message], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err.message);
      return res.status(500).send("Error saving submission");
    }
    res.status(200).json({
      message: "Submission saved!",
      id: result.insertId,
    });
  });
});

app.get("/submissions", (req, res) => {
  const query = "SELECT * FROM form_submissions";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving data:", err.message);
      return res.status(500).send("Error retrieving submissions");
    }
    res.status(200).json(results);
  });
});

app.delete("/submissions/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM form_submissions WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err.message);
      return res.status(500).send("Error deleting submission");
    } else if (result.affectedRows === 0) {
      return res.status(404).send("Submission not found");
    }
    res.status(200).json({ message: "Submission deleted successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
