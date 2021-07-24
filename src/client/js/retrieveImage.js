//API key for pixabay
const pixabay_API = 'https://pixabay.com/api/?key=';
const pixabay_ID = process.env.API_KEY_PIXABAY;

//use an async function
const getImage = async (destination, pixabay_API, pixabay_ID) => {
 	const response = await fetch(pixabay_API+pixabay_ID+'&q='+place+'&category=places&image_type=photo')
  try {
      .then(res=>res.json())
     	.then(function(res) {
     		const data = res.hits[1];
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

 //assistance provided for this function from mentor - https://knowledge.udacity.com/questions/641239
 app.post("/addImage", async function (req, res) {
     console.log('req====+>', req.body)
     const result = await fetch(geonames_API+destination+geonames_ID)
     try {
         const location = req.body.place;
          const img = await getImage(pixabay_API, destination);
          res.send({
            image: img
          });
          console.log(location);
     } catch (error) {
         console.log("error", error);
     }
 })

 export {retrieveImage}
