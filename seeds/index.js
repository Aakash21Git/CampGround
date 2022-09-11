const mongoose = require('mongoose');
const cities = require('./cities'); 
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../modles/campground');

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp');
    console.log("Mongo Connection Open!");
}
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() *20)+10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image:'https://unsplash.com/collections/483251/in-the-woods',
            description:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quidem, officia nesciunt tenetur numquam dolor soluta. Saepe atque inventore nobis placeat omnis quas, itaque in labore velit, necessitatibus excepturi autem.",
            price
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close()
});