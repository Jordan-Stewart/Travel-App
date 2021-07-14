// Fetches the results from the NLP API
const evaluateArticle = async (apiKey, formText) => {
  // API url
  let baseUrl = "https://api.meaningcloud.com/sentiment-2.1?";

  // Create a fetch url for the API
  const apiUrl = `${baseUrl}key=${apiKey}&url=${formText}&lang=en`

  const response = await fetch(apiUrl);

  try {
    const responseData = await response.json();
    return responseData
  } catch (e) {
    console.log(e);
  }
}

export { evaluateArticle }


//example from Meaningcloud https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/dev-tools

const formdata = new FormData();
formdata.append("key", "YOUR API KEY");
formdata.append("txt", "YOUR TEXT HERE");
formdata.append("lang", "TEXT LANGUAGE HERE");  // 2-letter code, like en es fr ...

const requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
  .then(response => ({
    status: response.status,
    body: response.json()
  }))
  .then(({ status, body }) => console.log(status, body))
  .catch(error => console.log('error', error));
