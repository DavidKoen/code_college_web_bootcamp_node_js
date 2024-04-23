const express = require('express'); // require express module. which is a server side framework
const path = require('path'); // helps us get the specific path
const ejs = require('ejs'); // imports EJS which is a templating engine.

const app = new express(); // calls express function to start new Express app

app.set('view engine', 'ejs'); // tell Express to use EJS as our templating engine, that any file ending in .ejs should be rendered with the EJS package.

app.use(express.static('public')); // we specify that any request that ask for assets should get it from the ‘public’ directory

app.listen(3000, () => {
    console.log('App listening on port 3000');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/post', (req, res) => {
    res.render('post');
});