const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://mrpusalasrinivasulu:VT9Z72DMm7RYPiEe@cluster0.3uixhcq.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Models
const User = require('./models/Blog');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Routes
const indexRoute = require('./routes/Index');
const blogRoute = require('./routes/Blog');
app.use('/', indexRoute);
app.use('/blogs', blogRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});