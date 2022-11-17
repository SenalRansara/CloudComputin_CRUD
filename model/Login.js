const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        unique: true
    }

})

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;