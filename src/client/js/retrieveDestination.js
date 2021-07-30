//API key for geonames
const geonames_API = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
const geonames_ID = process.env.USERNAME;

//change from function to async
const retrieveDestination = async (destination, geonames_API, geonames_ID) => {
    try {
      const response = await fetch(geonames_API+destination+geonames_ID)
      .then(res=>res.json())
      .then(function(res) {
      const lattitude = res.postalCodes[0].lat;
      const longitude = res.postalCodes[0].lng;
      const country = res.geonames[0].countryName;
      console.log(lattitude, longitude);
      const data = {place: res.postalCodes[0].placeName};
      return data;
        })
    } catch (error) {
      //catch any potential errors that arise and output results in console
      console.log("error", error);
    }
    return response;
};


//assistance provided for this function from mentor - https://knowledge.udacity.com/questions/641239
app.post("/addDestination", async function (req, res) {
    console.log('req====+>', req.body)
    const result = await fetch(geonames_API+destination+geonames_ID)
    try {
        console.log(result)
        const destination = req.body.place;
        const dest = await getDest(baseURL_geo, destination);
        res.send({
          dest: dest
        });
        console.log(destination)
    } catch (error) {
        console.log("error", error);
    }
})


export {retrieveDestination}
