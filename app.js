const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Camapground = require('./modles/campground');

// mongoose.connect('mongodb://localhost:27017/yelp-camp');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp');
    console.log("Mongo Connection Open!");
}
const app = express();

app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home.ejs')
});
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Camapground.find({})
    res.render('campgrounds/index', { campgrounds });
});
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})
app.post('/campgrounds', async (req, res) => {
    const campground = new Camapground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});
app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Camapground.findById(req.params.id)
    res.render('campgrounds/show', { campground });
});
app.get('/campgrounds/:id/edit',async (req,res)=>{
    const campground = await Camapground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
});
app.put('/campgrounds/:id',async (req,res)=>{
    const {id}=req.params;
     const campground = await Camapground.findByIdAndUpdate(id,{...req.body.campground});
     res.redirect(`/campgrounds/${campground._id}`);
});
app.delete('/campgrounds/:id',async (req,res)=>{
    const {id} = req.params;
    await Camapground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});


app.listen(3000, () => {
    console.log("Serving on Port 3000");
});