const mongoose = require('mongoose'); 


const userSchema = new mongoose.Schema({
    googleId: String,
    username: String,
})

const User = mongoose.model('User', userSchema);

module.exports = User;

/*
const User = mongoose.model('User', userSchema); 

model.exports = User; 

*/