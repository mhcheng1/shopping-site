const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const express = require('express');

// ***********************  Configs ******************************* //
const STRIPE_SECRET_KEY = process.env.REACT_APP_STRIPE_SECRET
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL
const SERVER_CONFIGS = process.env.PORT || 8080
const app = express()

app.use(cors({
  origin: FRONTEND_URL,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "OPTIONS"]
}))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mysql = require('mysql')

// *********************  Stripe Payment ************************* //
const stripe = require('stripe')(STRIPE_SECRET_KEY);

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

app.post('/checkout', async (req, res) => {
  await stripe.charges.create(req.body, postStripeCharge(res))
  //console.log(req.body);
});


// ***********************  MySQL ******************************* //
const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_SECRET,
  database: process.env.DATABASE
})

// insert user info
app.post("/api/insertUser", (req, res) => {
  const email = req.body.email
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const name = req.body.name
  const sqlInsert = "INSERT IGNORE INTO users(email, first_name, last_name) values(?,?,?);"
  db.query(sqlInsert, [email, first_name, last_name], (err, result) => {
    if (err) { console.log(err) }
  })
})

// insert order
app.post("/api/insertOrder", (req, res) => {
  const email = req.body.email
  const receipt_url = req.body.receipt_url
  const total = req.body.total
  const date = req.body.date
  const sqlInsert = "INSERT IGNORE INTO order_by(email, receipt_url, total, date) values(?,?,?,?);"
  db.query(sqlInsert, [email, receipt_url, total, date], (err, result) => {
    if (err) { console.log(err) }
  })
})

// insert products info
app.post("/api/insertItem", async (req, res) => {
  const items = req.body.items
  const sqlInsert = `INSERT IGNORE INTO Item(prod_id, name, price) values ? `
  db.query(sqlInsert, [items], (err, result) => {
    if (err) { console.log(err) }
  })
})

// insert products info
app.post("/api/insertOrderItem", (req, res) => {
  const order = req.body
  const sqlInsert = `INSERT IGNORE INTO Order_contain(order_url, prod_id, item_quantity) values ? `
  db.query(sqlInsert, [order], (err, result) => {
    if (err) { console.log(err) }
  })
})

// get order info
app.get("/api/getOrder", (req, res) => {
  const user_email = req.query.user_email
  const sqlSelect = `select * from order_by WHERE email= ? `
  db.query(sqlSelect, [user_email], (err, result) => {
    if (err) { console.log(err) }
    else {
      res.send(result)
    }
  })
})

// get item contained in the order
app.get("/api/getOrderItem", (req, res) => {
  if (req.query.receipt) {
    const receipt_url = req.query.receipt
    const sqlSelect =
    `SELECT name, price, item_quantity
    FROM
      Order_contain t1
    INNER JOIN Item t2
      ON t1.order_url= ? and t1.prod_id = t2.prod_id;`
    
    db.query(sqlSelect, [receipt_url] ,(err, result) => {
      if (err) { console.log(err) }
      else {
        console.log(result)
        res.send(result)
      }
    })
  }

})

app.get('/', (req, res) => {
  res.send("Server listening on: " + SERVER_CONFIGS)
})

app.listen(SERVER_CONFIGS, error => {
  if (error) throw error;
  console.log('Server running on port: ' + SERVER_CONFIGS);
});