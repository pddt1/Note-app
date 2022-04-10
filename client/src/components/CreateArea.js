import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Zoom } from '@mui/material';
import axios from "axios";
import getUniqueString from '../helper/getUniqueString';

const BASE="http://localhost:9000";
function CreateArea(props) {
  const [isExpanded,setExpanded]=useState(false);
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

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
    note['id']=getUniqueString();
    console.log(note);
    axios.post(BASE+'/post',note).then(()=>{
      props.onAdd(note);
      setNote({
        title: "",
        content: ""
      });
      window.history.pushState({},null,"/");
    }).catch(err=>{
      console.log(err);
    })
    event.preventDefault();
  }


  return (
    <div>
      <form>
        {isExpanded && (<input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />)}
        <textarea
          name="content"
          onClick={()=> setExpanded(true)}
        
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3:1}
        />
        <Zoom in={isExpanded}>
          <button onClick={submitNote}><AddIcon/></button>
        </Zoom>
        
      </form>
    </div>
  );
}

export default CreateArea;
