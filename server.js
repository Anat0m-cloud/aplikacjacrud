const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://Oskar:siema123@cluster0.mcrdm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const app = express();
let db;
let uczenCollection;

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    db = client.db('Cluster0')
    uczenCollection = db.collection('uczniowie')
  })
  .catch(console.error)



app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  
  db.collection('uczniowie').find().toArray()
    .then(results => {
      res.render('index.ejs', { uczniowie: results})
    })
    .catch(error => console.error(error))
})

app.use(bodyParser.urlencoded({ extended: true }))


app.post('/uczniowie', (req, res) => {

  uczenCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
      console.log(result)
    })
    .catch(error => console.error(error))
})
app.listen(3000, function () {
  console.log('listening on 3000')
})



