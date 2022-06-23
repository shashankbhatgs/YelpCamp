const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers'); 
const Campground = require('../models/campground'); 

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpCamp'); //use our local development db or this in production use production db //yelpCamp is the db name
    console.log("Database connected!!!")
}

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10; 
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`, 
            image: 'https://source.unsplash.com/collection/484351', 
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci doloribus animi ipsam quae! Sint, unde cupiditate illum ut adipisci corrupti vitae incidunt fuga, eum in enim aspernatur vero nihil recusandae!', 
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})