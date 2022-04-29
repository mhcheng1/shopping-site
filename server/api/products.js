const express = require('express');
const router = express.Router();
const Commerce = require('@chec/commerce.js')

// ***********************  Redis *********************************** //
const redis = require('ioredis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT);
redisClient.on('error', function (err) {
    console.log('*Redis Client Error: ' + err.message);
});
redisClient.on('connect', function () {
    console.log('Connected to redis instance');
});

// caching for products list retrieved from commerce.js
// send a stringified object back
const commerce = new Commerce(process.env.REACT_APP_COMMERCEJS_KEY, true);
router.get('/', async (req, res) => {
    const value = await redisClient.get('products');
    if (value === null) {
        console.log("no products in cache");
        const response = await commerce.products.list();
        await redisClient.set('products', JSON.stringify(response.data));
        redisClient.expire('products', 600); // cache expires in 600 secs
        res.send(JSON.stringify(response.data));
    }
    else {
        res.send(value);
    }
})

module.exports = router;