//Import other function exports
import { countdown } from "./countdown";
import { retrieveDestination } from "./retrieveDestination";
import { retrieveImage } from "./retrieveImage";
import { retrieveWeather } from "./retrieveWeather";

//had these in wrong order
let date = new Date();

//fix generateTrip function as per mentor advice -- https://knowledge.udacity.com/questions/649604
function generateTrip(e){
    e.preventDefault();
    const date = document.getElementById('date').value;
    //make calls to functions imported
    retrieveDestination (destination, geonames_API, geonames_ID);
    retrieveImage (destination, pixabay_API, pixabay_ID);
    //updated call to userview as per mentor instructions -- https://knowledge.udacity.com/questions/657944
    retrieveWeather(apiURL, postCode, apiKey).then( () => userView());

}

let userData = {};

//post data
const userView = async()=>{
      const entries = await fetch('/all');
          //try
          try{
              const projectData = await entries.json();
              //define variables
              const userDestination = document.getElementById('destination').value;
              const userDeparture = document.getElementById('date').value;

              // testing displaying geo API
              const geoAPI = await retrieveDestination(destination);
                 console.log(userData.lat);
                 console.log(userData.long);
              
              userData.lat = geoAPI.lat;
              userData.long = geoAPI.long;
              
              
              
              //icon: `https://www.weatherbit.io/static/img/icons/${forecast.weather.icon}.png`,
              //date: forecast.datetime,
              //min_temp: forecast.min_temp,
              //max_temp: forecast.max_temp
              
              
            }
          //catch any potential errors that arise and output results in console
          catch(err){
             console.log('Error posting data ' + err);
      }}

export {generateTrip}
