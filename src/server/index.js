// Setup empty JS object to act as endpoint for all routes
projectData = {};

const path = require('path')
const express = require('express')
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

// DECLARING THE PORT
const port = 8081;
const server = app.listen(port, () => {
    //log text in console for evidence that servers are working
    console.log ("server is running");
    console.log (`running on localhost: ${port}`);
});

app.get('/clientdataUrl', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

//copied accross from project 3 with some changes
app.get('/all', getData);

function getData (request, response){
    response.send(projectData);
    console.log(projectData);
};
app.post('/add', postData);

//post all
function postData (request, response) {

    let data = request.body;

    console.log('POST Update to server ', data);

    projectData['temp'] = data.temp;
    projectData['arrival'] = data.arrival;
    projectData['departure'] = data.departure;
    projectData['duration'] = data.duration;
    projectData['location'] = data.location;
    projectData['countdown'] = data.countdown;
    projectData['image'] = data.image;
    projectData['icon'] = data.icon;

    //send project data
    response.send(projectData);
};
