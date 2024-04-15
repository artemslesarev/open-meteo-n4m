const maxApi = require('max-api');
let xhttp  = require("xmlhttprequest").XMLHttpRequest;

let request  = new xhttp();
// your URL generated from https://open-meteo.com/en/docs/
let url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,rain&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FMoscow"; 

maxApi.addHandler('makeRequest', () => {
    request.open('GET', url, true);
    request.send();
});

maxApi.addHandler('randomLocation', (lat,lon) => {
    newUrl = url.replace(/latitude=[^&]*/, `latitude=${lat}`).replace(/longitude=[^&]*/, `longitude=${lon}`);
    request.open('GET', newUrl, true);
    request.send();
})

request.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText);
        maxApi.post(response);
        maxApi.outlet(response);
    }
}


