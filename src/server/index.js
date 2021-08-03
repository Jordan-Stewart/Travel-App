const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

const dotenv = require('dotenv');
dotenv.config();

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())

//console.log('Geonames username is ${genonames_id}, Weatherbit API key is ${weatherbit_id}, and Pixabay API key is ${pixabay_id}`);

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/clientdataUrl', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

//assistance provided for this function from mentor - https://knowledge.udacity.com/questions/641239
//app.post("/clientdataUrl", async function (req, res) {
//    console.log('req====+>', req.body)
//    const result = await fetch("https://api.meaningcloud.com/sentiment-2.1?key=" + process.env.API_KEY + "&url=" + req.body.formText + "&lang=en")
//    try {
//        console.log(result)
//        const response = await result.json();
//        res.send(response)
//        console.log(response)
//    } catch (error) {
//      console.log("error", error);
//    }
//})


module.exports = app;
