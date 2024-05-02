const BlogPost = require('../models/BlogPost.js');

const path = require('path');

module.exports = (req, res) => {
    const image = req.files.image;
  
    // image.mv moves the uploaded file to public/img directory with the name from image.name.
  
    image.mv(path.resolve(__dirname, '../public/img', image.name),
  
      //////////////////////////////////////////////////////////////////////////
  
      async (error) => {
        await BlogPost.create({
          ...req.body,
          image: '/img/' + image.name
        })
        res.redirect('/')
      })
  };