const express = require('express'); // require express module

const path = require('path'); // helps us get the specific path

const app = express(); // calls express function to start new Express app

app.use(express.static('public'));   // we specify that any request that ask for assets should get it from the ‘public’ directory

app.get('/', (req, res) => { // path.resolve(__dirname,'index.html') helps us get the full absolute path which otherwise changes based on different Operating Systems.
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

app.get('/about', (req, res) => { 
    res.sendFile(path.resolve(__dirname, 'about.html'))
});

app.get('/contact', (req, res) => { 
    res.sendFile(path.resolve(__dirname, 'contact.html'))
});

app.listen(3000, () => {
    console.log("App listening on port 3000")
});