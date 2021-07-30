//API key for weatherbit
const weatherbit_API = 'https://api.weatherbit.io/v2.0/current?';
const weatherbit_id = process.env.API_KEY_WEATHERBIT;

const retrieveWeather = async (destination, weatherbit_API, weatherbit_id) => {
        try {
 	    const response = await fetch(weatherbit_API+'city='+destination+'&key='+weatherbit_id)
      .then(res=>res.json())
     	.then(function(res) {
     		const data = {temp: res.data["0"].app_temp};
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

  app.post("/addWeather", async function (req, res) {
      console.log('req====+>', req.body)
      const weather = req.body.place;
      const result = await fetch(weatherbit_API, weather)
      try {
           res.send({
             temp: weatherData.temp,
           });
           console.log(location);
      } catch (error) {
          console.log("error", error);
      }
  })

export {retrieveWeather}
