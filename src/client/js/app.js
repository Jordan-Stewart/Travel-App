//Import other function exports
import { countdown } from "./countdown";
import { retrieveDestination } from "./retrieveDestination";
import { retrieveImage } from "./retrieveImage";
import { retrieveWeather } from "./retrieveWeather";

//had these in wrong order
let date = new Date();

function generateTrip(e){
    e.preventDefault();

    const date = document.getElementById('date').value;

    //make calls to functions imported
    retrieveDestination (destination, geonames_API, geonames_ID);
    retrieveImage (destination, pixabay_API, pixabay_ID);;
    retrieveWeather(apiURL, postCode, apiKey);

    //call countdown function for days remaining
    countdown (date);

    .then(function(data){
      console.log(data);

        document.getElementById('date').innerHTML = "Your trip is on: "+ date;
        const location = document.getElementById('destination').value;
      	await retrieveDestination(content);
      	await retrieveImage(content);
      	await retrieveWeather(content);
    })
      .then( () => userView());
    }
  }

  let userData = {};

//post data
const userView = async()=>{
      const entries = await fetch('/all');
          //try
          try{
              const projectData = await entries.json();
              //define variables
              const destination = document.getElementById('destination').value;
              const departure = document.getElementById('date').value;

              // testing displaying geo API
              const geoAPI = await retrieveDestination(destination);

              userData.lat = geoAPI.lat;
              console.log(userData.lat);

              userData.long = geoAPI.long;
              console.log(userData.long);

              userData.ctry = geoAPI.ctry;
            }
          //catch any potential errors that arise and output results in console
          catch(err){
             console.log('Error posting data ' + err);
      }}

export {generateTrip}
