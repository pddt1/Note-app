const mongoose = require('mongoose');
const Note=mongoose.model(
    'Note',
    new mongoose.Schema({
        // nid: String,
        title: String,
        content: String,
        author:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
    })
);
module.exports=Note;