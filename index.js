const express = require('express')
const app = express()
const port = 5000

const ObjectId = require('mongodb').ObjectId
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
    const tshirtsCollection = client.db("comfyTshirts").collection("tshirts");
    const ordersCollection = client.db("comfyTshirts").collection("orders");

    app.get('/products', (req, res) => {

        tshirtsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.post('/addProduct', (req, res) => {
        const newProduct = req.body
        tshirtsCollection.insertOne(newProduct)
            .then(result => {
                res.send(result.acknowledged)
            })
    })

    app.post('/addOrder', (req, res) => {
        const newOrder = req.body
        console.log(newOrder)
        ordersCollection.insertOne(newOrder)
            .then(result => {
                res.send(result.acknowledged)
            })
    })
    app.delete('/deleteProduct', (req, res) => {
        const _id = req.body
        tshirtsCollection.deleteOne({ _id: ObjectId(_id._id) })
            .then(result => {
                console.log(result)
                res.send(result.deletedCount > 0)
            })
    })

});



app.listen(port)