
/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=a69de1a0cc6e2f093ed74f440df622b9&units=metric";
const serverUrl = "http://localhost:8000/";

// Create a new date instance dynamically with JS
let getDate = new Date();
let newDate = getDate.getMonth()+1+'.'+ getDate.getDate()+'.'+ getDate.getFullYear();




// Event listener to add function to existing HTML DOM element
// Add Event listener when click generate button 

document.getElementById('generate').addEventListener('click',() => {
    let allData = {
        date: newDate,
        zipCode: document.getElementById('zip').value,
        temp :  document.getElementById('temp'),
        content: document.getElementById('feelings').value
    };

/* Function called by event listener */
    getZip(allData.zipCode).then(ZipCodeInfo => {
        allData.temp = ZipCodeInfo.list[0].main.temp;
        saveData(allData);
    });
});


// Save Data to the object

async function saveData(allData) {
    let save = await fetch(serverUrl+ "postData", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allData),
    });
     save.json().then(data => { setEntryContent();});   
}

/* Function to GET Web API Data*/
// Get the ZipCod Info

async function getZip(code) {
    let openWeatherMap = `http://api.openweathermap.org/data/2.5/forecast?zip=${code}${apiKey}`;
    return await (await fetch(openWeatherMap)).json()
}

/* Function to POST data */
/* Function to GET Project Data */


// Display the result 

let setEntryContent = async () => {
    let getData = await fetch(serverUrl+ "getAll");
        getData.json().then(data => {
            document.getElementById('content').innerHTML = `You feel: ${data.content}`;
            document.getElementById('date').innerHTML = `Today's Date: ${data.date}`;
            document.getElementById('temp').innerHTML = `Current Temperature: ${data.temp} °C`;
            
        });
    
}
