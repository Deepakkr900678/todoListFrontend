import { useState } from "react";
import NotesContext from "./NoteContext";
const NoteState = (props) => {
  const host = "https://todolistbackend-e7ju.onrender.com";
  const [state, setState] = useState([]);

  const getNotes = async () => {
    await fetch(`${host}/api/notes/allnotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((response) => setState(response))
      .catch((err) => console.error(err));
  };

  const addNotes = async (title, description, tag) => {
    const data = {
      title: title,
      description: description,
      tag: tag,
    };
    await fetch(`${host}/api/notes/createnote`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        getNotes();
      })
      .catch((err) => console.error(err));
  };

  const editNotes = async (id, title, description, tag) => {
    const data = {
      title: title,
      description: description,
      tag: tag,
    };
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        getNotes();
      })
      .catch((err) => console.error(err));
  };

  const deleteNotes = async (id) => {

    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        getNotes();
      })
      .catch((err) => console.error(err));
  };
  return (
    <NotesContext.Provider
      value={{ state, addNotes, deleteNotes, getNotes, editNotes }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};
export default NoteState;
