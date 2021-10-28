const express = require('express');
var cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();

// Use middleware 
app.use(cors())
app.use(express.json());

// Connect with database 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0f9z2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } finally {
        // await client.close();
    }
};
run().catch(console.dir);

// Initial Server 
app.get('/', (req, res) => {
    res.send("Joy travel Server Is running")
});

app.listen(port, () => {
    console.log("listining to",port);
})




