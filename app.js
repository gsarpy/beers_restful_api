// Initital App Configuration
// ==========================

// import packages
let express     = require('express');
let app         = express(); // define app using express
let bodyParser  = require('body-parser');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set port 8080 for the app
let port = process.env.PORT || 8080;

// App Routes
// ==========
let router = express.Router();

// test route to make sure it's working found at localhost:8080/api
router.get('/', function(req, res) {
  res.json({ message: 'OMG SUCCESS!!! You have access to the API! But you should probably switch up your query for real data'});
});

// Main App Routes
// ===============


// Set routes to use /api prefix
app.use('/api', router);


// Start the Server
// ================
app.listen(port);
console.log('Server running on port: ' + port);
