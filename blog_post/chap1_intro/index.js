const http = require('http');
const fs = require('fs');

const homePage = fs.readFileSync('index.html');
const aboutPage = fs.readFileSync('about.html');
const contactPage = fs.readFileSync('contact.html');
const notFoundPage = fs.readFileSync('notfound.html');

const server = http.createServer((req, res) => {
    if (req.url === '/about') {
        console.log(req.url);
        res.end(aboutPage)
    }

    else if (req.url === '/contact') {
        console.log(req.url);
        res.end(contactPage)
    }

    else if (req.url === '/') {
        console.log(req.url);
        res.end(homePage) 
    }

    else {
        console.log(req.url);
        res.writeHead(404);
        res.end(notFoundPage)
    }
});

server.listen(3000);