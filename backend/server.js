require('dotenv').config();
const express = require('express');
const app = express();
const colors = require('colors');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware');
const ExpressError = require('./utils/ExpressError');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/dogs', require('./routes/dogRoutes'));

app.get('/', (req, res) => {
    res.send('IT IS WORKING!');
});

app.all('*', (req, res) => {
    throw new ExpressError('Page not found!', 404);
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`SERVING ON PORT ${port}`);
});