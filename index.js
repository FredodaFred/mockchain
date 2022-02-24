//Import express and morgan
const express = require("express"); // Imports Express's class definition
const morgan = require("morgan"); // Imports Morgan's class definition


// Create the application using express
const app = express();
// Use express for console logging
app.use(morgan("dev")); // Pretty-print requests with the "dev" format

//Listen on port 8080
const port = 8080; 

// Imports the blockchain datastructure we created
const Blockchain = require("./blockchain");

// Global variables
global.difficulty = 5; // Difficulty to mine a particular block
global.blockchain = new Blockchain(); // Our copy of the blockchain
global.transactions = []; // Our current transactions

//use our routes (From routes folder) in our app
require("./routes")(app);
//Start the server
app.listen(port, () => {
    // Log that our server is running in the terminal
    console.log(`Server is listening at http://localhost:${port}/`);
});


