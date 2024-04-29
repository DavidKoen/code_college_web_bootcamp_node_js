const express = require("express"),
  app = express(),
  router = express.Router(),
  mongoose = require("mongoose"),
  ejs = require("ejs"),
  bodyParser = require('body-parser'),
  fileUpload = require('express-fileupload'),
  loginUserController = require('./controllers/loginUser');
  loginController = require('./controllers/login'),
  logoutController = require('./controllers/logout'),
  storeUserController = require('./controllers/storeUser'),
  validateMiddleware = require("./middleware/validationMiddleware"),
  newUserController = require('./controllers/newUser'),
  homeController = require('./controllers/home'),
  newPostController = require('./controllers/newPost'),
  aboutController = require('./controllers/about'),
  storePostController = require('./controllers/storePost'),
  getPostController = require('./controllers/getPost'),
  contactController = require('./controllers/contact'),
  expressSession = require('express-session'),
  authMiddleware = require('./middleware/authMiddleware'),
  redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware'),
  flash = require('connect-flash');

const db = mongoose.connection;

/* We first declare a global variable loggedIn that will be accessible from all our EJS files. Because the
navigation bar exist in all our EJS files, they will each have to access loggedIn to alter the navigation bar. */

global.loggedIn = null;

/////////////////////////////////////////

/* each time you refresh your app, the message 'Custom middle ware called' will be logged in the
 console.

 next() tells Express that the middleware is done and Express should call the next middleware function.
 If you remove next() and go to your app in the browser, the app will hang as you have not told Express
 to proceed on to the next middleware function. */

const customMiddleWare = (req, res, next) => {
  console.log('Custom middle ware called')
  next()
};
router.use(customMiddleWare);

////////////////////////////////////////////////////////////

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://localhost:27017/my_database",
  { useUnifiedTopology: true, useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);

const { error } = require('console');

// successful DB connection

db.once("open", () => {
  console.log("Mongoose: MongoDB connection successful");
});

app.set("port", process.env.PORT || 3000);

///////////////////////////////////

app.set("view engine", "ejs")

/* The use function registers a middleware with our Express app. So, when a browser makes a request to a
page for example, Express will execute all the ‘use’ statements sequentially before handling the request. */

router.use(express.static("public"));
router.use(
  bodyParser.urlencoded({
    extended: false
  })
);

router.use(bodyParser.json());

router.use(fileUpload());

///////////////////////////////////////////////////////

router.use('/posts/store', validateMiddleware);

app.use(expressSession({
  secret: 'keyboard cat'
}));


/* we specify with the wildcard *, that on all requests, this
middleware should be executed. In it, we assign loggedIn to req.session.userId. */

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next()
});

//////////////////////////////////////////////////

app.use(flash());

// routing

router.get('/about', aboutController);

router.get('/contact', contactController);

router.get('/create', authMiddleware, newPostController);

router.get('/', homeController);

router.get('/post/:id', getPostController);

router.post('/posts/store', authMiddleware, storePostController);

router.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

router.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);

router.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

router.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

router.get('/auth/logout', logoutController);

router.use((req, res) => res.render('notfound'));

////////////////////////////////////////////////////////////////////

app.use("/", router);
router.use(fileUpload());

app.listen(app.get("port"), () => {
  console.log("Listening on port: 3000")
});