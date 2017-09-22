// Initital App Configuration
// ==========================

// import packages
let express     = require('express');
let app         = express(); // define app using express
let bodyParser  = require('body-parser');
let Beer     = require('./app/models/Beers');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// App Routes
// ==========
let router = express.Router();

// Handler for all requests
router.use(function(req, res, next) {
  console.log('Something is happening');
  next();
});

// test route to make sure it's working found at localhost:8080/api
router.get('/', function(req, res) {
  res.json({ message: 'OMG SUCCESS!!! You have access to the API! But you should probably switch up your query for real data'});
});

// Main App Routes
// ===============

// General POST and GET for Beers
router.route('/beers')
  // POST new beer
  .post(function(req, res) {

    let beer = new Beer();
    beer.name = req.body.name;
    beer.brewery = req.body.brewery;
    beer.type = req.body.type;

    beer.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Beer Brewed!' });
    });

  })

  // GET all beers
  .get(function(req, res) {
    Beer.find(function(err, beers) {
      if (err)
        res.send(err);

      res.json(beers);
    });
  })

// GET By id
router.route('/beers/:beer_id')

  // get beer with unique id
  .get(function(req, res) {
    Beer.findById(req.params.beer_id, function(err, beer) {
      if (err)
        res.send(err);
      res.json(beer);
    });
  })

  .put(function(req, res) {

    Beer.findById(req.params.beer_id, function(err, beer) {
      if (err)
        res.send(err);
      // update beer info
      beer.name = req.body.name;
      beer.brewery = req.body.brewery;
      beer.type = req.body.type;

      // save changes for beer
      beer.save(function(err) {
        if (err)
          res.send(err);

        // if successful send success message
        res.json({ message: 'Beer updated!' });

      });
    });
  })

  .delete(function(req, res) {
    Beer.remove({
      _id: req.params.beer_id
    }, function(err, beer) {
        if (err)
          res.send(err);

        res.json({ message: 'Successfully drank the beer (aka it was deleted) '});
    });
  });

// Set routes to use /api prefix
app.use('/api', router);


// set port 8080 for the app
let PORT = process.env.PORT || 8080;

// Start the Server
// ================
app.listen(PORT);
console.log('Server running on port: ' + port);
