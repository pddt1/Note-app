const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Note = db.note;
const _=require('lodash');
const mongoose = require('mongoose');
exports.addNote=(req,res)=>{
    User.findOne({username: req.body.username}).then(user=>{
        const note= new Note({
            title: req.body.title,
            content: req.body.content,
            author: user._id
        });
        note.save((err,item)=>{
            if(err){
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "Your note was added successfully!",data: item});
        });
    })
    
}

exports.retriveNote=(req,res)=>{
    User.findOne(req.query).then(user=>{
        Note.find({author: user._id},(err,foundNotes)=>{
            if(err){
                res.status(500).send({ message: err });
                return;
            }
            else{
                if(foundNotes.length!==0){
                    const listNotes=foundNotes;
                    res.status(200).send({ "data": listNotes});
                }
            }
        });
    });
}

exports.deleteNote=(req,res)=>{
    const nid = mongoose.Types.ObjectId(_.capitalize(req.params.nid));
        Note.findOneAndRemove({_id:nid},(err)=>{
            if(err)  res.status(500).send({ message: err });
            else res.send({ message: "Your note was deleted successfully!" });
        });
}