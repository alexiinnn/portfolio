/**
 * Created by Alexey on 10-Dec-16.
 */

var mongoose = require('mongoose');

//db
// mongoose.connect('mongodb://localhost/portfolio');
// var aboutModel = mongoose.connection;
// aboutModel.on('error', console.error.bind(console, 'connection error:'));
// aboutModel.once('open', function () {
//     // console.log("we're connected!");
// });

var skillSchema = mongoose.Schema({
        skill: String,
        value: Number,
        division: String,
        order: Number
    },
    {collection: 'about'}
);

var SkillModel = mongoose.model('SkillModel', skillSchema);

// SkillModel.find({}, function (err, items) {
//         items.forEach(function (item) {
//             console.log(item);
//         })
//     })
module.exports = SkillModel;
