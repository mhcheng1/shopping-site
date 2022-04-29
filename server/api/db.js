const express = require('express');
const router = express.Router();
const mysql = require('mysql')

// ***********************  MySQL Routes ******************************* //
const connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_SECRET,
    database: process.env.DATABASE
})

// check for connection to MySQL
connection.query("SELECT 1;", (err) => {
    if (err) console.log(err);
    else console.log("Connected to MySQL")
});

router.get("/", (req, res) => {
    res.send("gottem")
})

// insert user info
router.post("/insertUser", (req, res) => {
    const email = req.body.email
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const name = req.body.name
    const sqlInsert = "INSERT IGNORE INTO users(email, first_name, last_name) values(?,?,?);"
    connection.query(sqlInsert, [email, first_name, last_name], (err, result) => {
        if (err) { console.log(err) }
        else { res.sendStatus(200) }
    })
})

// insert order
router.post("/insertOrder", (req, res) => {
    const email = req.body.email
    const receipt_url = req.body.receipt_url
    const total = req.body.total
    const date = req.body.date
    const sqlInsert = "INSERT IGNORE INTO order_by(email, receipt_url, total, date) values(?,?,?,?);"
    connection.query(sqlInsert, [email, receipt_url, total, date], (err, result) => {
        if (err) { console.log(err) }
        else { res.sendStatus(200) }
    })
})

// insert products info
router.post("/insertItem", async (req, res) => {
    const items = req.body.items
    const sqlInsert = `INSERT IGNORE INTO Item(prod_id, name, price) values ? `
    connection.query(sqlInsert, [items], (err, result) => {
        if (err) { console.log(err) }
    })
})

// insert products info
router.post("/insertOrderItem", (req, res) => {
    const order = req.body
    const sqlInsert = `INSERT IGNORE INTO Order_contain(order_url, prod_id, item_quantity) values ? `
    connection.query(sqlInsert, [order], (err, result) => {
        if (err) { console.log(err) }
    })
})

// get order info
router.get("/getOrder", (req, res) => {
    const user_email = req.query.user_email
    const sqlSelect = `select * from order_by WHERE email= ? `
    connection.query(sqlSelect, [user_email], (err, result) => {
        if (err) { console.log(err) }
        else {
            res.send(result)
        }
    })
})

// get item contained in the order
router.get("/getOrderItem", (req, res) => {
    if (req.query.receipt) {
        const receipt_url = req.query.receipt
        const sqlSelect =
            `SELECT name, price, item_quantity
                    FROM
                    Order_contain t1
                    INNER JOIN Item t2
                    ON t1.order_url= ? and t1.prod_id = t2.prod_id;`

        connection.query(sqlSelect, [receipt_url], (err, result) => {
            if (err) { console.log(err) }
            else {
                console.log(result)
                res.send(result)
            }
        })
    }
})

module.exports = router;