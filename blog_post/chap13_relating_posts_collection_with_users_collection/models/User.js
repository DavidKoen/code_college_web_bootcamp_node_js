const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true,'Please provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please provide password']
    }
});

UserSchema.plugin(uniqueValidator);

/* we tell Mongoose that before we save any record into the Users
schema or Users collection, execute the function passed into the 2nd argument. This lets us change user
data before saving it into the database. */

UserSchema.pre('save', function (next) {

    //////////////////////////////////////////////////////

    const user = this

    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
});

// export model
const User = mongoose.model('User', UserSchema);

module.exports = User