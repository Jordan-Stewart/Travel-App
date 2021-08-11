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
//as per mentor instructions, can no longer use 'process'
//const weatherbit_id = process.env.API_KEY_WEATHERBIT;
const weatherbit_ID = '0abe41b4eb674feb972e9e00a57b7dfb';

//when generate button is clicked, run generateTrip function
document.getElementById('generate').addEventListener('click', generateTrip);



//fix generateTrip function as per mentor advice -- https://knowledge.udacity.com/questions/649604
function generateTrip(e) {
      //added this in
      e.preventDefault();

      const destination = document.getElementById("destination").value
      const arrival = new Date(document.getElementById("arrival").value);
      const departure = new Date(document.getElementById("departure").value);

          console.log('no validation errors');

          //clear error message if one is currently displayed
          document.querySelector('#error').innerHTML = '';
          //call retrieveDestination function
          //updated chaining of function
          //realized I can't just use 'data' for all functions as it'll conflict, so had to uniquely identify a data name for each data e.g: 'destinationData'
          retrieveDestination(geonames_API, geonames_ID, destination).then((destinationData) => {
            //initialize lat/lng variables so they can be passed on to weatherbit can be retrieved
            const lat = destinationData.geonames[0].lat;
            console.log (lat);

            const lng = destinationData.geonames[0].lng;
            console.log (lng);

            //upon succesful call, call retrieveWeather function
            retrieveWeather(weatherbit_API, weatherbit_ID, lat, lng).then((weatherData) => {
               //upon succesful calls, call retrieveImage function
               retrieveImage (pixabay_API, pixabay_ID, destination).then((imageData) => {
                 //data collected for user
                  let userData = {
                      destinationLattitude: destinationData.geonames[0].lat,
                      destinationLongitude: destinationData.geonames[0].lng,
                      destinationCountry: destinationData.geonames[0].countryName,
                      destinationTemp: weatherData.data[0].temp,
                      weatherDescription: weatherData.data[0].weather.description,
                      weatherIcon: weatherData.data[0].weather.icon,
                      destinationImage: imageData.hits[0].webformatURL,
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

//retrieveDestination function
const retrieveDestination = async (geonames_API, geonames_ID, destination) => {
      const response = await fetch(geonames_API + destination + "&maxRows=10&username=" + geonames_ID)
      try {
          const userData = await response.json(); // Return data as JSON
          console.log(userData);

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
          console.log(userData);
          return userData;
          }
          //catch any potential errors that arise and output results in console
          catch(error) {
            console.log("error", error);
          }
        }

//retrieveImage function
//fixed reference to match call in generateTrip() function
const retrieveWeather = async (weatherbit_API, weatherbit_ID, lat, lng) => {
      const response = await fetch(weatherbit_API +'lat=' + lat +'&lon=' + lng + '&key=' + weatherbit_ID)
      try {
          const userData = await response.json(); // Return data as JSON
          console.log(userData);

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
              const icon = document.getElementById("weather_icon");
              const countryImage = document.getElementById("country_image");
              const destination = document.getElementById("destination").value

              const arrivalDate = new Date(document.getElementById("arrival").value);
              console.log("the arrival date is " + arrivalDate);

              const departureDate = new Date(document.getElementById("departure").value);
              console.log("the departure date is " + departureDate);

              //calculation code courced from https://knowledge.udacity.com/questions/661208
              var time_difference = departureDate.getTime() - arrivalDate.getTime();
              console.log(time_difference);

              var days_difference = Math.ceil(time_difference / (1000 * 60 * 60 * 24));
              console.log(days_difference);

              var today = new Date();
              new Date(today).getTime();
              // To calculate the time difference of two dates
              var difference_time = arrivalDate.getTime() - today.getTime();
              // To calculate the no. of days between two dates
              var countdown = Math.ceil(difference_time / (1000 * 60 * 60 * 24));
              console.log(countdown);

              //input validation
              if (
                destination.value === "")
                {
                const validateInput = 'Please enter your desired destination';
                document.querySelector('#error').innerHTML = validateInput;
                alert(validateInput);
                }

                if (
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
                }

              //display different countdown message dependent on days remaining until trip
                  if (countdown == 0) {
                  document.querySelector('#countdown').innerHTML = "I hope your bags are packed! Today's the day you head off to " + destination;
                  }
                    if (countdown == 1) {
                        document.querySelector('#countdown').innerHTML = "Starting packing your bags because tomorrow you're heading off to " + destination;
                    }
                    if (countdown > 1) {
                        document.querySelector('#countdown').innerHTML = "In " + countdown + " days you'll be heading off to " + destination;
                    }
                    else {
                      document.querySelector('#countdown').innerHTML = "Somethings gone wrong with your  dates";
                    }

              document.querySelector('#duration').innerHTML = "The length of your trip will be " + days_difference + " day/s!";
              document.querySelector('#high_temperature').innerHTML= "The current forecasted temperature is " + Math.round(userData.destinationTemp) + " degrees";
              document.querySelector('#weather_description').innerHTML= "You can expect: " + userData.weatherDescription;
              //display countryImage
              document.querySelector('#country_image').src = userData.destinationImage;
              //display Icon
              icon.setAttribute("src", `https://www.weatherbit.io/static/img/icons/${userData.weatherIcon}.png`);
            }
          //catch any potential errors that arise and output results in console
          catch(err){
             console.log('Error posting data ' + err);
      }}
