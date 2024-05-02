const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* Models are defined through the Schema interface. Remember that a collection represents an entity in our
app. e.g. users, products, blogposts. A schema represents how a collection looks like. This means that
each document in the collection would have the fields specified in the schema. */

const BlogPostSchema = new Schema({
    title: String,
    body: String
});

/////////////////////////////////////

const BlogPost = mongoose.model('BlogPost',BlogPostSchema);
module.exports = BlogPost;