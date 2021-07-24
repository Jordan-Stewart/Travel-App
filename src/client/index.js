import { countdown } from "../countdown";
import { retrieveDestination } from "../retrieveDestination";
import { retrieveImage } from "../retrieveImage";
import { retrieveWeather } from "../retrieveWeather";
import { generateTrip } from '../js/app'

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
              const geoApiRes = await retrieveDestination(destination);

              userData.lat = geoApiRes.lat;
              console.log(travelData.lat);

              userData.long = geoApiRes.long;
              console.log(travelData.long);

              userData.ctry = geoApiRes.ctry;
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
