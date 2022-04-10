import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';
const BASE="http://localhost:9000";
function App() {
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    axios.get(BASE+'/').then(response=>{
      console.log(response.data.response);
      setNotes(response.data.response);
    }).catch(err => console.log(err));
  },[]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    axios.delete(BASE+'/notes/'+id).then(() =>{
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem) => {
          return noteItem.id !== id;
        });
      });
    }).catch(err=>console.log(err));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
