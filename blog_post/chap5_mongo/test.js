const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost:27017/my_database', {
    useNewUrlParser: true
});

// BlogPost.create({
//     title: 'The Mythbuster Guide to Saving Money on Energy Bills',
//     body: 'If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year. They go like this:'
// }, (error, blogpost) => {
//     console.log(error, blogpost)
// });

BlogPost.find({ // finds the post with a title that starts with The
    title: /The/
}, (error, blogspot) => {
    console.log(error, blogspot)
});

BlogPost.findByIdAndUpdate('6627c081172d063768b00034', {
    body: 'This has been updated.'
}, (error, blogspot) => {
    console.log(error, blogspot)
})