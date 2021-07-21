const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

const dotenv = require('dotenv');
dotenv.config();

const app = express()

<!-- API KEYS -->
//API key for geonames
const geonames_API = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
const genonames_id = process.env.USERNAME;
//API key for weatherbit
const weatherbit_API = 'https://api.weatherbit.io/v2.0/current?';
const weatherbit_id = process.env.API_KEY_WEATHERBIT;
//API key for pixabay
const pixabay_API = 'https://pixabay.com/api/';
const pixabay_id = process.env.API_KEY_PIXABAY;


app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())

console.log('Geonames username is ${genonames_id}, Weatherbit API key is ${weatherbit_id}, and Pixabay API key is ${pixabay_id}`);
            
<!-- MIDDLEWARE -->
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// designates what port the app will listen to for incoming requests - instructed by mentor: https://knowledge.udacity.com/questions/642781
app.listen(8081, function () {
    console.log('Example app listening on port 8081')
})

app.get('/clientdataUrl', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

//assistance provided for this function from mentor - https://knowledge.udacity.com/questions/641239
app.post("/clientdataUrl", async function (req, res) {
    console.log('req====+>', req.body)
    const result = await fetch("https://api.meaningcloud.com/sentiment-2.1?key=" + process.env.API_KEY + "&url=" + req.body.formText + "&lang=en")
    try {
        console.log(result)
        const response = await result.json();
        res.send(response)
        console.log(response)
    } catch (error) {
        console.log("error", error);
    }
})

app.post('/location', async(req,res)=> {
	const destination = req.body.place;
	const dest = await getDest(baseURL_geo, destination);
	res.send({
		dest: dest
	});
	console.log(destination)
})


app.post('/weather', async(req, res)=>{
	const weather = req.body.place;
	const weatherData = await getWeather(baseURL_weath, weather);
	console.log(weatherData);
	res.send({
		temp: weatherData.temp,
		description: weatherData.description
	});
	
})

app.post('/addImage', async (req, res) => {
	const placeName = req.body.place;
	const img = await getImage(baseURL_pic, placeName);
	res.send({
		image: img
	});
	console.log(placeName);
})
