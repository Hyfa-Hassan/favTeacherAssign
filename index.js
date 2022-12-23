require('dotenv').config();
const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express()
const connectionstring = "mongodb+srv://HyfaaHassan:Numaanii%40123321@cluster0.qkw14ee.mongodb.net/test"
MongoClient.connect(connectionstring, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('fav-teacher')
    const teacher=db.collection('login')
    
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })
    app.post('/login', (req, res) => {
        teacher.insertOne(req.body)
          .then(result => {
            console.log(result)
            res.redirect('/views/favteacher.html')
          })
          .catch(error => console.error(error))
    })
    app.listen(5000, function() {
        console.log('listening on port 5000')
    })
})
.catch(console.error)