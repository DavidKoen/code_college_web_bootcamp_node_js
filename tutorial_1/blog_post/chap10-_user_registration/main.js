const express = require("express"),
  app = express(),
  router = express.Router(),
  mongoose = require("mongoose"),
  ejs = require("ejs"),
  bodyParser = require('body-parser'),
  fileUpload = require('express-fileupload'),
  loginUserController = require('./controllers/loginUser');
  loginController = require('./controllers/login'),
  storeUserController = require('./controllers/storeUser'),
  validateMiddleware = require("./middleware/validationMiddleware"),
  newUserController = require('./controllers/newUser'),
  homeController = require('./controllers/home'),
  newPostController = require('./controllers/newPost'),
  aboutController = require('./controllers/about'),
  storePostController = require('./controllers/storePost'),
  getPostController = require('./controllers/getPost'),
  contactController = require('./controllers/contact');

const db = mongoose.connection;

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

// routing

router.get('/about', aboutController);

router.get('/contact', contactController);

router.get('/create', newPostController);

router.get('/', homeController);

router.get('/post/:id', getPostController);

router.post('/posts/store', storePostController);

router.get('/auth/register', newUserController);

router.post('/users/register', storeUserController);

router.get('/auth/login', loginController);

router.post('/users/login',loginUserController);

////////////////////////////////////////////////////////////////////

app.use("/", router);
router.use(fileUpload());

app.listen(app.get("port"), () => {
  console.log("Listening on port: 3000")
});