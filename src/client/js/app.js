//API key initialisation
//API key for geonames
const geonames_API = 'http://api.geonames.org/searchJSON?q=';
//as per mentor instructions, can no longer use 'process'
//const geonames_ID = process.env.USERNAME;
const geonames_ID = 'jordanstew';
//API key for pixabay
const pixabay_API = 'https://pixabay.com/api/?key=';
//as per mentor instructions, can no longer use 'process'
//const pixabay_ID = process.env.API_KEY_PIXABAY;
const pixabay_ID = '22586387-a08bdea789818942120f45452';
//API key for weatherbit
const weatherbit_API ='https://api.weatherbit.io/v2.0/current?';
//const todays_forecast = 'https://api.weatherbit.io/v2.0/current?';
//const future_forecast = 'http://api.weatherbit.io/v2.0/forecast/daily?'
//as per mentor instructions, can no longer use 'process'
//const weatherbit_id = process.env.API_KEY_WEATHERBIT;
const weatherbit_ID = '0abe41b4eb674feb972e9e00a57b7dfb';
//had these in wrong order
let date = new Date();

//when generate button is clicked, run generateTrip function
//document.getElementById('generate').addEventListener('click', generateTrip);

document.getElementById('generate').addEventListener('click', generateTrip);

var regEx = /^[A-Za-z]+$/;
//fix generateTrip function as per mentor advice -- https://knowledge.udacity.com/questions/649604
function generateTrip(e) {
      if (
        destination.value === '' ||
        destination.value == null )
        {
        const validateInput = 'Please enter your desired destination';
        document.querySelector('#error').innerHTML = validateInput;
        alert(validateInput);
      } else if (
          //validation for empty inputs
        arrival.value === '' ||
        arrival.value == null ||
        departure.value === '' ||
        departure.value == null ||
        arrival.value > departure.value)
          {
          const validateInput = 'Please insert a valid arrival/departure date';
          document.querySelector('#error').innerHTML = validateInput;
          alert(validateInput);
      } else {
          console.log('no validation errors');
          //clear error message if one is currently displayed
          document.querySelector('#error').innerHTML = '';
          //retrieve elements entered by user
          //update to include both departure and arrival
          const arrivalDate = document.getElementById('arrival').value;
          const departureDate = document.getElementById('departure').value;
          const destination = document.getElementById('destination').value;
          //call retrieveDestination function
          //updated chaining of function
          retrieveDestination(geonames_API, geonames_ID, destination).then(function(data) {
            //upon succesful call, call retrieveWeather function
            retrieveWeather(weatherbit_API, weatherbit_ID, destination).then(function(data) {
               //upon succesful calls, call retrieveImage function
               retrieveImage (pixabay_API, pixabay_ID, destination).then(function (data) {
                 //data collected for user
                  let userData = {
                      destinationLattitude: data.geonames[0].lat,
                      destinationLongitude: data.geonames[0].lng,
                      destinationCountry: data.geonames[0].countryName,
                      destinationLow_temp: data.data[0].low_temp,
                      destinationHigh_temp: data.data[0].high_temp,
                      weatherDescription: data.data[0].description,
                      destinationImage: data.hits[0].webformatURL,
                  };
                  console.log(userData);
                  //post data
                  postData('/add', userData).then(() => {
                      //call userview function
                      userView();
                  });
               });
            });
          });
      }
}

//retrieveDestination function
const retrieveDestination = async (geonames_API, geonames_ID, destination) => {
      const response = await fetch(geonames_API + destination + "&maxRows=10&username=" + geonames_ID)
      try {
          const userData = await response.json(); // Return data as JSON
          return userData;
        }
        //catch any potential errors that arise and output results in console
        catch(error) {
          console.log("error", error);
        }
      }

//retrieveImage function
const retrieveImage = async (pixabay_API, pixabay_ID, destination) => {
      const response = await fetch(pixabay_API + pixabay_ID + '&q=' + destination + '&category=places&image_type=photo')
      try {
          const userData = await response.json(); // Return data as JSON

          //testing display of image
          //const testdata = res.hits[1];
          //console.log(testdata);

          return userData;
          }
          //catch any potential errors that arise and output results in console
          catch(error) {
            console.log("error", error);
          }
        }

//retrieveImage function
//fixed reference to match call in generateTrip() function
const retrieveWeather = async (weatherbit_API, weatherbit_ID, destination) => {
      const response = await fetch(weatherbit_API + 'country=' + destination + '&key=' + weatherbit_ID)
      try {
          const userData = await response.json(); // Return data as JSON
          return userData;
          }
          //catch any potential errors that arise and output results in console
          catch(error) {
            console.log("error", error);
          }
        }

//Displaying final outcome of destination data
const postData= async ( url = '', userData = {})=>{
      //all of the following has been copied across from my third project
      const response = await fetch(url, {
      //post data
      method: 'POST',
      //set credentials
      credentials: 'same-origin',
      headers: {
        //define content type as JSON
        'Content-Type': 'application/json',
      },
      // Body data type must match "Content-Type" header
      body: JSON.stringify(userData),
    });
      //console.log(response);
      try {
        const newData = await response.json();
        return newData;
      }
      //catch any potential errors that arise and output results in console
      catch(error) {
      console.log("error", error);
    }
  }


//post data
const userView = async()=>{
      const entries = await fetch('/all');
          try{
              const userData = await entries.json();
              console.log(userData);
              //retrieve icon
              //const icon = document.getElementById("destination")
              //const icon = document.getElementById("arrival")
              //const icon = document.getElementById("departure")
              const icon = document.getElementById("weather_icon");
              const countryImage = document.getElementById("country_image");
              //variables for calculating trip duration
              var dateArrive = arrivalDate;
              var dateDepart = departureDate;
              // To calculate the time difference of two dates
              var difference_date = dateArrive.getTime() - dateDepart.getTime();
              //caculate the no. of days between two dates
              const duration_length = difference_date / (1000 * 3600 * 24);

              const destination = document.getElementById('destination').value;
              //calculation for time remaining until trip departure
              var setDate = document.getElementById('arrival').value;
              //getting todays date
              var today = new Date();
              //sourced from https://tecadmin.net/get-current-date-time-javascript/
              var todaysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              //the following was sourced from https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
              // To calculate the time difference of two dates
              var difference_time = setDate.getTime() - todaysDate.getTime();
              // To calculate the no. of days between two dates
              const countdown = difference_time / (1000 * 3600 * 24);

              //retrieve html i.d's
              document.querySelector('#destination').innerHTML, document.querySelector('#countdown').innerHTML = "In " + countdown + " days you'll be heading off to " + userData.location;
              document.querySelector('#duration').innerHTML = "The length of your trip is " + duration_length + " days";
              document.querySelector('#high_temperature').innerHTML= "The current forecasted max temperature is " + userData.destinationHigh_temp + " degrees";
              document.querySelector('#low_temperature').innerHTML= "The current forecasted minimum temperature is " + userData.destinationLow_temp + " degrees";
              document.querySelector('#weather_description').innerHTML= userData.weatherDescription;
              document.querySelector('#image').src = userData.destinationImage;
              //Display images/icons
              //Check if country image can be found, if so; display

              ///countryImage.setAttribute("src", userData.countryArray[0]);
              //if(userData.countryArray === undefined){
              // document.querySelector('#country_error ').innerHTML= "No valid image could be found";
              //} else {
              //  countryImage.setAttribute("src", userData.countryArray[0]);
              //}
              //display icon
              icon.setAttribute("src", `https://www.weatherbit.io/static/img/icons/${userData.weatherIcon}.png`);

            }
          //catch any potential errors that arise and output results in console
          catch(err){
             console.log('Error posting data ' + err);
      }}
