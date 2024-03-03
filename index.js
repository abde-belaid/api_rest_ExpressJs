const express = require('express')
const app = express();
const bodyParser = require('body-parser');

const parkings = require('./parkings.json')

// dans cette 👇️ partie on recupere la liste des parkings 
app.get('/parkings', (req, res) => { res.status(200).json(parkings) })

// dans cette 👇️ partie on fait la recherche d'un parking par id

app.get('/parkings/:id', (req, res) => {
  const id = req.params.id
  // const parking=parkings.filter(elem=>elem.id==id)[0]
  const parking = parkings.find(parking => parking.id == id)

  res.status(200).json(parking)
})


// ✅ Register the bodyParser middleware here

app.use(bodyParser.json());

// ⛔️ c'est pas forcement de l'utiliser

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// dans cette 👇️ partie on ajoute un parking au fichier parkings.json

app.post('/parkings', (req, res) => {

  // parkings.unshift(req.body)   // pour l'ajouter au debut 
  parkings.push(req.body)   // pour l'ajouter a la fin
  res.status(200).json(parkings)
})


app.delete("/parkings/:id", (req, res) => {
  const id = req.params.id
  const parking = parkings.find(parking => parking.id == id)

  parkings.splice(parking, 1)

  res.status(200).json(parkings)
})

app.put("/parkings/:id", (req, res) => {

  const id = req.params.id

  const name = req.body.name
  const type = req.body.type
  const city = req.body.city

  const parking = parkings.find(parking => parking.id == id)

  parking.name = name
  parking.type = type
  parking.city = city



  res.status(200).json(parkings)
})


app.listen(8080, () => { console.log("Serveur à l'écoute") })

