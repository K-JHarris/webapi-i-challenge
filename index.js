// implement your API here
// https://open.spotify.com/track/0BHrUMSvKXmYyMPMKXvu9O good song

// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');

// creates an express application using the express module
const server = express();
server.use(express.json())

//require the db data
const database = require('./data/db.js');

// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get('/', (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  res.send('What do tigers dream of, when they take a little tiger snooze?');
});

// new route handler that responds to get requests

//get request
server.get("/api/users", (req, res) => {
  database
    .find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: `Request Denied: ${err}` }));
});

//get by ID
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  database
    .findById(id)
    .then(user =>
      user
        ? res.status(200).json(user)
        : res.status(500).json({ error: `The user with the specified ID does not exist.` })
        )
    .catch(err => res.status(500)
    .json({error: `The user information could not be retrieved ${err}`}))
});

//post request
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;

  if(!name || !bio){
    res
    .status(400)
    .json({ errorMessage: 'Please provide a name for the user' });
} 
else {
  database.insert(req.body)
    .then(database => {
      res.status(201).json(database);
    })
    .catch(() => {
      res.status(500).json({
        errorMessage:
          'its broken!',
      });
    });
}
});






// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(8000, () => console.log('API running on port 8000'));