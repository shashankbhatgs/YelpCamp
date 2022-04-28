const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log("Database connected");
}

const db = mongoose.connection;

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    // res.send('hello from yelp camp')
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {

    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
})

// app.get('/makecampground', async (req, res) => {
//     const camp = new Campground({ title: 'My Backyard', description: 'cheap camping' });
//     await camp.save();
//     res.send(camp)
// })

app.listen(3000, () => {
    console.log('Serving on port 3000!')
})
