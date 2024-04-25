const express = require("express"),
  app = express(),
  router = express.Router(),
  mongoose = require("mongoose"),
  BlogPost = require('./models/BlogPost'),
  ejs = require("ejs"),
  bodyParser = require('body-parser'),
  path = require("path"),
  db = mongoose.connection;

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
app.set("view engine", "ejs")

router.use(express.static("public"));
router.use(
  bodyParser.urlencoded({
    extended: false
  })
);

router.use(bodyParser.json());

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

router.post('/posts/store', async (req, res) => {
  await BlogPost.create(req.body, (error, blogpost) => {
    res.redirect('/');
  });
});
// routing

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log("Listening on port: 3000")
});