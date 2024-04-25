const express = require("express"),
  app = express(),
  router = express.Router(),
  mongoose = require("mongoose"),
  BlogPost = require('./models/BlogPost'),
  ejs = require("ejs"),
  bodyParser = require('body-parser'),
  path = require("path"),
  fileUpload = require('express-fileupload'),
  db = mongoose.connection;

/* each time you refresh your app, the message 'Custom middle ware called' will be logged in the
 console.

 next() tells Express that the middleware is done and Express should call the next middleware function.
 If you remove next() and go to your app in the browser, the app will hang as you have not told Express
 to proceed on to the next middleware function. */

const customMiddleWare = (req, res, next) => {
  console.log('Custom middle ware called')
  next()
};
app.use(customMiddleWare);

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

// routing

router.get('/', async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render('index', {
    blogposts: blogposts
  });
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.get('/post/:id', async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id)
  res.render('post', {
    blogpost: blogpost
  });
});

router.get('/create', (req, res) => {
  res.render('create');
});

/* The validateMiddleWare middleware simply checks if any of the form fields are null (which means
  that they are not entered by the user) and if so, redirect them back to the create post page. */

const validateMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title == null) {
    return res.redirect('/create')
  }
  next()
};
router.use('/posts/store', validateMiddleWare);

////////////////////////////////////////////////////////////////////

router.post('/posts/store', (req, res) => {
  const image = req.files.image;

  // image.mv moves the uploaded file to public/img directory with the name from image.name.

  image.mv(path.resolve(__dirname, '/public/img', image.name),

    //////////////////////////////////////////////////////////////////////////

    async (error) => {
      await BlogPost.create({
        ...req.body,
        image: '/img/' + image.name
      })
      res.redirect('/')
    })
});

app.use("/", router);
router.use(fileUpload());

app.listen(app.get("port"), () => {
  console.log("Listening on port: 3000")
});