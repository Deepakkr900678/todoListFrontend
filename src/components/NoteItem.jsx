import React, { useContext } from "react";
import NotesContext from "../context/notes/NoteContext";
import "../NoteItem.css";
const NoteItem = (props) => {
  const { deleteNotes } = useContext(NotesContext);
  const { notes, updateNote } = props;
  return (
    <>
      <div className="col-md-3 mb-2  ">
        <span className="badge rounded-pill text-bg-dark">{notes.tag}</span>
        <div className="card note" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title my-2">{notes.title}</h5>
            <h6 className="card-subtitle mb-3 text-body-secondary">
              {new Date(notes.date).toString().slice(0, 25)}
            </h6>
            <p className="card-text mb-4">{notes.description}</p>
            <i
              className="fa-solid fa-trash-can mx-2"
              style={{ color: "#161717", cursor: "pointer" }}
              onClick={() => {
                deleteNotes(notes._id);
              }}
            ></i>
            <i
              className="fa-regular fa-pen-to-square mx-2"
              style={{ color: "#161717", cursor: "pointer" }}
              onClick={() => {
                updateNote(notes);
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
