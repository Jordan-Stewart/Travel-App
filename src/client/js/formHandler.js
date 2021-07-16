//do I need to make this function async?
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    // url for API form MeaningCloud
    //let baseUrl = "https://api.meaningcloud.com/sentiment-2.1?";
    Client.checkURL(formText)
    console.log("::: Form Submitted :::")

    // Create a fetch url for the API
    //const fullApi = `${baseUrl}key=${apiKey}&url=${formText}&lang=en`

    if (Client.checkURL(formText)) {
        fetch('http://localhost:8081/', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({ content: formText }),
            redirect: "follow",
            mode: "cors",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json',
            },
            //stringify text retrieved
            body: JSON.stringify({formText : formText}),
        })
            .then(res => res.json())
            .then(function (res) {
                //console.log(res)
                document.getElementById('results').innerHTML = 'Score: ' + res.score_tag + 'Agreement: ' + res.agreement + 'Confidence: ' + res.confidence + 'Irony: ' + res.irony;
            })
    } else {
        alert ('This is not a valid URL')
    };
}
}

export { handleSubmit }
