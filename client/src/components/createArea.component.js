import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Zoom } from '@mui/material';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import Alert from '@mui/material/Alert';

function CreateArea(props) {
  const [isExpanded,setExpanded]=useState(false);
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [resMessage, setResMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    const user=AuthService.getCurrentUser();
    note["username"]=user.username;
    UserService.addNote(note).then(res=>{
      const addedNote=res.data.data;
      // console.log(addedNote);
      props.onAdd(addedNote);
      setNote({
        title: "",
        content: ""
      });

    },err=>{
      console.log(err);
      setResMessage(err.response.data.message);
    })
  }


  return (
    <div>
      <form className="createArea">
        {isExpanded && (<input
          className="inputCreateArea"
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />)}
        <textarea
          name="content"
          className="inputCreateArea"
          onClick={()=> setExpanded(true)}
        
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3:1}
        />
        <Zoom in={isExpanded}>
          <button onClick={submitNote} className="buttonCreateArea"><AddIcon/></button>
        </Zoom>
        
      </form>
      {
        resMessage && (
          <Alert onClose={() => {setResMessage("");}}>resMessage</Alert>
        )
      }
    </div>
  );
}

export default CreateArea;
