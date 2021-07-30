import { countdown } from "./js/countdown";
import { retrieveDestination } from "./js/retrieveDestination";
import { retrieveImage } from "./js/retrieveImage";
import { retrieveWeather } from "./js/retrieveWeather";
import { generateTrip } from './js/app'

import './styles/main.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/slideshow.scss'
import './styles.responsive.scss'

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


// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener("click", performAction);



console.log(checkURL);

//alert("I EXIST")
//onsole.log("CHANGE!!");
