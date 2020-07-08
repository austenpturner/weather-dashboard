const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const mongo = 'mongodb://localhost/weather-dashboard';

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/database" || mongo, 
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    }
);

// Creating express app
const app = express();

// Setting up port
const PORT = process.env.PORT || 8000;

// Use "public" folder to serve static assets
app.use(express.static('public'));

// Express middleware - sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Listen on prior defined PORT
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});