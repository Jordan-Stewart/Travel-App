function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    //let formText = document.getElementById('name').value
    // url for API form MeaningCloud
    let baseUrl = "https://api.meaningcloud.com/sentiment-2.1?";
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    // Create a fetch url for the API
    const fullApi = `${baseUrl}key=${apiKey}&url=${formText}&lang=en`
    
    fetch(fullApi)
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

export { handleSubmit }
