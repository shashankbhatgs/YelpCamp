const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate'); 
const session = require('express-session'); 
const flash = require('connect-flash'); 
const ExpressError = require('./utils/ExpressError'); 
const methodOverride = require('method-override'); 

const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');


main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpCamp'); //use our local development db or this in production use production db //yelpCamp is the db name
    console.log("Database connected!!!")
}

const app = express();

app.engine('ejs', ejsMate); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true})); //req.body wont be empty
app.use(methodOverride('_method'));   //_method name has to same as the name in ejs 
app.use(express.static(path.join(__dirname, 'public')))

const sessionConig = {
    secret: 'thisisnotasecret', 
    resave: false, 
    saveUninitialized: true, 
    cookie: {
        httpOnly: true, 
        expires: Date.now() + 1000*60*60*24*7, 
        maxAge:  1000*60*60*24*7
    }
}
app.use(session(sessionConig))
app.use(flash()); 

app.use((req, res, next)=>{
    res.locals.success = req.flash('success'); 
    res.locals.error = req.flash('error'); 
    next(); 
})

app.use('/campgrounds', campgrounds); 
app.use('/campgrounds/:id/reviews', reviews)

app.get('/', (req, res) => {
    res.render('home');
})

app.all('*', (req, res, next)=>{
    next(new ExpressError('page not found', 404))
})

app.use((err, req, res, next)=>{
    const {statusCode = 500} = err; 
    if(!err.message) err.message = 'oh no, something went wrong'
    res.status(statusCode).render('error', {err});
})


app.listen(3000, () => {
    console.log('LISTENING TO PORT 3000!!');
}); 