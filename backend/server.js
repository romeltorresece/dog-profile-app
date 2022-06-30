require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const colors = require('colors');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware');
const ExpressError = require('./utils/ExpressError');
const User = require('./models/userModel');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
    name: 'session',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
};
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/dogs', require('./routes/dogRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

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