const mongoose = require('mongoose');

//const Schema = mongoose.Schema;
const { Schema } = mongoose; // Two things are same. It is called destructuring

const userSchema = new Schema({
    googleId: String

});

mongoose.model('users', userSchema);