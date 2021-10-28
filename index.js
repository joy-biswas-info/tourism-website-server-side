const express = require('express');
var cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();

// Use middleware 
app.use(cors())
app.use(express.json());




// Initial Server 
app.get('/', (req, res) => {
    res.send("Joy travel Server Is running")
});

app.listen(port, () => {
    console.log("listining to",port);
})




