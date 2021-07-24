//Import other function exports
import { countdown } from "../countdown";
import { retrieveDestination } from "../retrieveDestination";
import { retrieveImage } from "../retrieveImage";
import { retrieveWeather } from "../retrieveWeather";

//had these in wrong order
let date = new Date();

//when generate button is clicked, run generateWeather function
//document.getElementById('generate').addEventListener('click', generateWeather);

function generateTrip(e){
    e.preventDefault();
    // Get input data to include in the POST
    //can't use let, need to use const (not for going forward)
    const date = document.getElementById('date').value;
    //Get weather data for designated postcode
    //As per mentor instructions - "method retrieveWeather should have parameter sequence as `apiURL`, `postCode` and `apiKey`"

    //make calls to functions imported
    retrieveDestination (destination, geonames_API, geonames_ID);
    retrieveImage (destination, pixabay_API, pixabay_ID);;
    retrieveWeather(apiURL, postCode, apiKey);


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

  //validation function for zipCode as per mentor instructions -- https://knowledge.udacity.com/questions/629283
  //function validateZipCode(elementValue){
    //var zipCodePattern = /^(0[289][0-9]{2})|([123456789][0-9]{3})$/;
    //return zipCodePattern.test(elementValue);
  }

export {generateTrip}
