const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser')
const cors = require('cors')

const DB_NAME = 'comfyTshirts'
const DB_USER = 'tshirt-user'
const DB_PASSWORD = 'ZEScgQTWMuC5X4i'


app.use(bodyParser.json())
app.use(cors())

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://tshirt-user:ZEScgQTWMuC5X4i@cluster0.lhztw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const tshirtCollections = client.db("comfyTshirts").collection("tshirts");
    console.log('database connected successfully')
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port)