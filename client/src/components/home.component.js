import React, { useState,useEffect } from "react";
import Note from "./note.component";
import CreateArea from "./createArea.component";
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import Alert from '@mui/material/Alert';


function HomeApp() {
  const [notes, setNotes] = useState([]);
  const [resMessage, setResMessage] = useState("");

  useEffect(()=>{
    const user=AuthService.getCurrentUser();
    UserService.getAllNotes(user.username).then(res=>{
      setNotes(res.data.data);
    });
    
  },[]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    
    UserService.deleteNote(id).then((res) => {
      setNotes(prevNotes => {
            return prevNotes.filter((noteItem) => {
              // console.log(noteItem._id+ ' '+id);
              return noteItem._id !== id;
            });
          });
    },err=>{
      console.log(err);
      setResMessage(err.response.data.message);
    });
   
  }

  return (
    <div>
    {
        resMessage && (
          <Alert onClose={() => {setResMessage("");}}>resMessage</Alert>
        )
      }
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        console.log(noteItem._id);
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}

    </div>
  );
}

export default HomeApp;
