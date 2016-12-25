/**
 * Created by Alexey on 10-Dec-16.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
        username: {
            type: String,
            unique : true,
            required : true
        },
        password: {
            type: String,
            required : true
        }
    },
    {collection: 'user'}
);
// userSchema.plugin(passportLocalMongoose);
//
// userSchema.methods.validPassword = function( pwd ) {
//     return ( this.password === pwd );
// };

const UserModel = mongoose.model('userModel', userSchema);

module.exports = UserModel;
