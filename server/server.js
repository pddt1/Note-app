const express=require("express");
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const _=require('lodash');
const cors = require("cors");
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({
    type:['application/json','text/plain']
}))
mongoose.connect("mongodb://localhost:27017/notes", {useNewUrlParser: true});
const notesSchema={
    nid: String,
    title: String,
    content: String
};
const Note= mongoose.model('Note',notesSchema);

app.post('/post',(req,res)=>{
        const data=req.body;
        const note= new Note({
        nid: data.id,
        title: data.title,
        content: data.content
        });
        note.save().then(()=>{
            res.send(JSON.stringify({"status": 200, "error": null, "response": 'ok'}));
        }).catch(err=>{
            res.send(JSON.stringify({"status": 400, "error": 1, "response": err}));
        });
    
});

app.delete('/notes/:nid',(req,res)=>{
    const nid = _.capitalize(req.params.nid);
    Note.findOneAndRemove(nid,(err)=>{
        if(err) res.send(JSON.stringify({"status": 400, "error": 1, "response": err}));
        else res.send(JSON.stringify({"status": 200, "error": null, "response": 'ok'}));
    });
});

app.get('/',(req,res)=>{
        Note.find({},(err,foundNotes)=>{
            if(err){
                res.send(JSON.stringify({"status": 400, "error": 1, "response": err}));
            }
            else{
                if(foundNotes.length!==0){
                    const listNotes=foundNotes;
                    res.send(JSON.stringify({"status": 200, "error": null, "response": listNotes}));
                }
            }
        });

})

app.listen(9000, function() {
    console.log("Server started on port 9000");
  });