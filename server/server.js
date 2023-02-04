const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const session = require("express-session");
const speakeasy = require("speakeasy");
const secret = speakeasy.generateSecret({ length: 4 });
const crypto = require("crypto");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// res.header("Access-Control-Allow-Origin", "http://localhost:3000");
// res.header("Access-Control-Allow-Credentials", true);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mAsenko88",
  database: "Organic",
});

// email
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "bajracharyagenious@gmail.com",
    pass: "hpjzmzpbgsuasirl",
  },
});

//otp ting

//try2
const { Vonage } = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: "82896004",
  apiSecret: "1Rr2KCZAMjH9zI1M",
});

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.post("/register", (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const phone = req.body.phone;
  const token = crypto.randomBytes(20).toString("hex");

  con.query(
    "INSERT INTO users (email, username, password, phone, token) VALUES (?, ?, ?, ?, ?)",
    [email, username, password, phone, token],
    (err, result) => {
      if (result) {
        const mailOptions = {
          from: '"Organic Healtcare" <bajracharyagenious@gmail.com>',
          to: req.body.email,
          subject: "Verification Link",
          text:
            "Click the link to verify your email: http://localhost:3001/verify?token=" +
            token,
        };
        transporter.sendMail(mailOptions, (error, result) => {
          if (error) {
            // show an error message
            res.send({ message: "Mail Error!" });
          } else {
            res.send(result);
          }
        });
        res.send(result);
      } else {
        res.send({ message: "Error" });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const token = speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
  });
  con.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          con.query(
            "UPDATE users SET otp = ? WHERE username = ?",
            [token, username],
            (err, result) => {
              if (err) {
                res.status(500).send({ message: " Error!" });
              } else {
                con.query(
                  "SELECT phone FROM users WHERE username = ?",
                  [username],
                  (err, result) => {
                    if (err) {
                      res.status(500).send({ message: " Error!" });
                    } else if (result.length > 0) {
                      const phoneNumber = result[0].phone;
                      const from = "Organic Healthcare";
                      const to = `977${phoneNumber}`;
                      const text = `Your OTP is: ${token}`;

                      async function sendSMS() {
                        await vonage.sms
                          .send({ to, from, text })
                          .then((resp) => {
                            console.log("Message sent successfully");
                            console.log(resp);
                          })
                          .catch((err) => {
                            console.log(
                              "There was an error sending the messages."
                            );
                            console.error(err);
                          });
                      }

                      sendSMS();
                      res.send(result);
                    }
                  }
                );
              }
            }
          );
          // res.send(result);
        } else {
          res.send({ message: "INCORRECT USERNAME OR PASSWORD!" });
        }
      }
    }
  );
});

app.post("/forgot", (req, res) => {
  const email = req.body.email;
  const code = speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
  });
  con.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Mail Error!" });
    } else {
      if (result.length > 0) {
        con.query(
          "UPDATE users SET otp = ? WHERE email = ?",
          [code, email],
          (err, result) => {
            if (err) {
              res.status(500).send({ message: "Mail Error!" });
            } else {
              const mailOptions = {
                from: '"Organic Healtcare" <bajracharyagenious@gmail.com>',
                to: req.body.email,
                subject: "Reset your Password",
                text: "Your code is " + code,
              };
              transporter.sendMail(mailOptions, (error, result) => {
                if (error) {
                  // show an error message
                  res.send({ message: "Mail Error!" });
                } else {
                  res.send(result);
                }
              });
              // res.send(result);
            }
          }
        );

        // res.send(result);
      } else {
        res.send({ message: "Incorrect Email!" });
      }
    }
  });
});

app.post("/reset", (req, res) => {
  const code = req.body.code;
  const password = req.body.password;
  const confPassword = req.body.confPassword;

  if (password === confPassword) {
    const insertString = "UPDATE users SET password = ? WHERE otp = ?";
    con.query(insertString, [password, code], (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }
      res.send(result);
    });
  } else {
    res.send({ message: "Passwords dont match" });
  }
});

app.post("/otp", (req, res) => {
  const otp = req.body.otp;
  const queryString = "SELECT * FROM users WHERE otp = ? ";
  con.query(queryString, [otp], (error, results) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else if (results.length > 0) {
      req.session.loggedIn = true;
      res.send(results);
    } else {
      res.send({ message: "Incorrect OTP" });
    }
  });
});

app.get("/verify", (req, res) => {
  const token = req.query.token;
  // console.log(token);
  // check the token in the database
  con.query(
    "SELECT * FROM users WHERE token = ?",
    [token],
    (error, results) => {
      if (error) {
        // show an error message
        return res.send(error.message);
      }
      if (results.length > 0) {
        // update the user's status in the database
        con.query(
          "UPDATE users SET verified = 1 WHERE token = ?",
          // "UPDATE users SET (username, password, email, phone, verified) VALUES (?, ?, ?, ?, ?) Where token= ?",
          [token],
          (error) => {
            if (error) {
              // show an error message
              return res.send(error.message);
            }
            // show a success message
            res.send("Your email address has been verified.");
            // res.redirect("http://localhost:3000/login");
          }
        );
      } else {
        // show an error message
        res.send("Invalid token.");
      }
    }
  );
});

//Product
app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  con.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching products: ", error.message);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

app.get("/products/:id", (req, res) => {
  const productId = req.params.id;

  con.query(
    `SELECT * FROM products WHERE id = ${productId}`,
    (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }

      const product = results[0];

      if (!product) {
        return res.status(404).send("Product not found");
      }

      res.send(product);
    }
  );
});

app.listen(3001, () => {
  console.log("running backend server");
});
