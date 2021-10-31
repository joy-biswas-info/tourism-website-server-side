const express = require('express');
var cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;

const app = express();

// Use middleware 
app.use(cors());
app.use(express.json());

// Connect with database 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0f9z2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const db_name="joy_travels"
        const db = client.db(db_name);
        const placesCollection = db.collection('places');
        const orderCollection=db.collection('booked')

        // Get api 
        app.get('/places',async(req, res)=> {
            const cursor = placesCollection.find({});
            const places = await cursor.toArray();
            res.send(places);  
        });

        // Post api 
        app.post("/places", async (req, res) => {
            const place = req.body;
            const result = await placesCollection.insertOne(place);
            res.json(result);
        });

        // Conditional  find Api 
        app.get("/placeorder/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const place = await placesCollection.findOne(query);
            res.json(place);

        });

        app.get("/myorder/:email", async (req, res) => {
            const email = req.params.email;
            console.log(email);
            const query = { email: email };
            const courser = orderCollection.find(query);
            const orders =await courser.toArray();
            res.send(orders);
        })
        app.post("/order", async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order)
            res.send(result);
        })


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




