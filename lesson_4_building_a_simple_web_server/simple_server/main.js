/* GET - This method requests information from a server. Typically, a server
responds with content that you can view back on your browser 
(such as by clicking a link to see the home page of a site).

POST - This method sends information to the server. A server may respond with
an HTML page or redirect you to another page in the application after processing your 
data (such as filling out and submitting a sign-up form). */

const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),

    app = http.createServer((request, response) => {

        console.log("Received an incoming request!");

        response.writeHead(httpStatus.OK, {

            "Content-Type": "text/html"

        });

        let responseMessage = "<h1>Hello, Universe!</h1>";

        response.write(responseMessage);

        response.end();

        console.log(`Sent a response : ${responseMessage}`);
    });

app.listen(port);

console.log(`The server has started and is listening on port number:${port}`);