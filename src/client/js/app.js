//Import other function exports
import { retrieveDestination } from "./retrieveDestination";
import { retrieveImage } from "./retrieveImage";
import { retrieveWeather } from "./retrieveWeather";


//fix generateTrip function as per mentor advice -- https://knowledge.udacity.com/questions/649604
function generateTrip(e){
    e.preventDefault();

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
              
              //calculation for time remaining until trip
              var setDate = document.getElementById('date').value;
              //getting todays date
              var today = new Date();
              //sourced from https://tecadmin.net/get-current-date-time-javascript/
              var todaysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

              //the following was sourced from https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
              // To calculate the time difference of two dates
              var Difference_In_Time = setDate.getTime() - todaysDate.getTime();
  
              // To calculate the no. of days between two dates
              var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
              
              //display results of calculation
              document.querySelector('#date').innerHTML = "You have " + projectData.date + " days remaining until your trip!";
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
