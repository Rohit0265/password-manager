const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const MongoClient = require('mongodb').MongoClient;
dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const port = 3000
const dbName = 'myproject';
client.connect()
const app = express()
app.use(bodyparser.json())
app.use(cors())


app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('document');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})
app.post('/', async(req, res) => {
    const db = client.db(dbName);
    const password = req.body;
    const collection = db.collection('document');
    const findResult = await collection.insertOne(password);
    res.send("success: true ");
})
app.delete('/', async(req, res) => {
    const db = client.db(dbName);
    const password = req.body;
    const collection = db.collection('document');
    const findResult = await collection.deleteOne(password);
    res.send("success: true ");
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})