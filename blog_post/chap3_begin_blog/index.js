const express = require('express'); // require express module. which is a server side framework
const path = require('path'); // helps us get the specific path
const app = new express(); // calls express function to start new Express app

app.use(express.static('public')); // we specify that any request that ask for assets should get it from the ‘public’ directory

app.listen(3000, () => {
    console.log('App listening on port 3000');
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html')) // path.resolve(__dirname,'index.html') helps us get the full absolute path which otherwise changes based on different Operating Systems.
});

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
});

app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'))
}); 