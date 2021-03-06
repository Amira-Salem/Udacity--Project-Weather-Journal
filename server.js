// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express ();

/* Middleware*/
const bodyParser = require("body-parser");



//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require ("cors");
const { response } = require("express");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));


// Setup Server
const port = 8000;

app.listen (port, () => { console.log (`sever is running on the port ${port}`);});


// Get Route
app.get('/getAll',getData);

function getData(request, response)
{
    response.send(projectData);

}


// Post Route
app.post ('/postData', postData);
function postData (request, response)
{
    projectData={
        date:request.body.date,
        temp:request.body.temp,
        content:request.body.content
    };
    response.send(projectData);
}