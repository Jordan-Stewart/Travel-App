//API key for weatherbit
const weatherbit_API = 'https://api.weatherbit.io/v2.0/current?';
const weatherbit_id = process.env.API_KEY_WEATHERBIT;

const retrieveWeather = async (destination, weatherbit_API, weatherbit_id) => {
        try {
 	    const response = await fetch(weatherbit_API+'city='+destination+'&key='+weatherbit_id)
      .then(res=>res.json())
     	.then(function(res) {
                //testing to see if this works for icon via support provided here https://knowledge.udacity.com/questions/649596
                const icon_code = [from API response at res.weather.icon]
                const icon = document.getElementById("weather_icon")
                icon.setAttribute("src", `https://www.weatherbit.io/static/img/icons/${icon_code}.png` );
                
     		let data = {temp: res.data[0].app_temp, icon:};
     		console.log(data);
     		return data;
     	})
    }
    //catch any potential errors that arise and output results in console
    catch(error) {
      console.log("error", error);
    }
    return response;
  }

//assistance provided for this function from mentor - https://knowledge.udacity.com/questions/649604
/*
  app.post("/addWeather", async function (req, res) {
      console.log('req====+>', req.body)
      const weather = req.body.place;
      const result = await fetch(weatherbit_API, weather)
      try {
           res.send({
                   //testing to see if working
             temp: addWeather.temp,
             icon: addWeather.icon,
           });

      } catch (error) {
          console.log("error", error);
      }
  })
*/

export {retrieveWeather}
