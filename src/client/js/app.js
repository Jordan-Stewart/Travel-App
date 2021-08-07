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
document.getElementById('generate').addEventListener('click', generateTrip);

document.getElementById('generate').addEventListener('click', validation);


//fix generateTrip function as per mentor advice -- https://knowledge.udacity.com/questions/649604
function generateTrip(e){
    e.preventDefault();
    //retrieve elements entered by user
    //update to include both departure and arrival
    let arrivalDate = document.getElementById('arrival').value;
    let departureDate = document.getElementById('departure').value;
    
    //variables for calculating trip duration
    var dateArrive = arrivalDate;
    var dateDepart = departureDate;
    // To calculate the time difference of two dates
    var difference_date = dateArrive.getTime() - dateDepart.getTime();
    //caculate the no. of days between two dates
    const duration = difference_date / (1000 * 3600 * 24);
    
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
    //determine if forcast will be set for tomorrow or future set date
    //if (date <= 1) {
    //  weatherbit_API = todays_forecast;
    //} else {
    //  weatherbit_API = future_forecast;
    //}

    //call retrieveDestination function
    //updated chaining of function
    retrieveDestination(destination).then(function(data)) {
      //upon succesful call, call retrieveWeather function
      retrieveWeather(weatherbit_API, data.geonames[0].lat, data.geonames[0].lng, weatherbit_ID).then(function(data) {
         //upon succesful calls, call retrieveImage function
         .retrieveImage (pixabay_API, pixabay_ID, destination).then(function (data)) {
            //post data
            .postData('/', {data: data.data, destination: destination, date: date, countdown: countdown}).then(() => {
                //call userview function
                userView(data.hits[0].imageURL)
            });
         });
      });
    });
}


//validate user input and display appropiate error message if input fields are left blank
function validation() {         
    if (
    arrival.value === '' || 
    arrival.value == null || 
    departure.value === '' || 
    departure.value == null || 
    destination.value === '' || 
    destination.value == null ||) 
        {
        const validateInput = 'Please insert a departure date and your desired destination';
        document.querySelector('#error').innerHTML = validateInput;
        return false;
    } else {
        return true;
    }
}

//retrieveDestination function
const retrieveDestination = async (destination) => {
      const response = await fetch(geonames_API + destination + geonames_ID)
      try {
          const data = await response.json(); // Return data as JSON
          return data;
        }
        //catch any potential errors that arise and output results in console
        catch(error) {
          console.log("error", error);
        }
      }

//retrieveImage function
const retrieveImage = async (pixabay_API, pixabay_ID, destination) => {
      const response = await fetch(pixabay_API + pixabay_ID + '&q=' + place + '&category=places&image_type=photo')
      try {
          const data = await response.json(); // Return data as JSON
          return data;
          }
          //catch any potential errors that arise and output results in console
          catch(error) {
            console.log("error", error);
          }
        }

//retrieveImage function
const retrieveWeather = async (destination, weatherbit_API, weatherbit_ID) => {
      const response = await fetch(weatherbit_API+'city='+destination+'&key='+weatherbit_ID)
      try {
          const data = await response.json(); // Return data as JSON
          return data;
          }
          //catch any potential errors that arise and output results in console
          catch(error) {
            console.log("error", error);
          }
        }

//Displaying final outcome of destination data
const postData= async ( url = '', data = {})=>{
      //all of the following has been copied across from my third project
      const response = await fetch('http://localhost:8080', {
      //post data
      method: 'POST',
      //set credentials
      credentials: 'same-origin',
      headers: {
        //define content type as JSON
        'Content-Type': 'application/json',
      },
      // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
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
          //try
          try{
              const projectData = await entries.json();
              //define variables
              const destination = document.getElementById('destination').value;
              const departure = document.getElementById('date').value;

              document.querySelector('#destination').innerHTML, document.querySelector('#countdown').innerHTML = "In " + projectData.countdown + " days you'll be heading off to " + projectData.location;
              document.querySelector('#temp').innerHTML = "The temperature is currently: " + projectData.temp;


              //document.querySelector('#icon').innerHTML =
              //document.querySelector)('#image').innerHTML =  



            }
          //catch any potential errors that arise and output results in console
          catch(err){
             console.log('Error posting data ' + err);
      }}
