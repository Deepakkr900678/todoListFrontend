import React, { useContext, useEffect, useRef, useState } from "react";
import NotesContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();

  const ref = useRef(null);
  const updateNote = (note) => {
    setNoteInput({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
    ref.current.click();
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    
  }, []);
  const { state, getNotes, editNotes } = useContext(NotesContext);

  const [noteInput, setNoteInput] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    editNotes(noteInput.id, noteInput.etitle, noteInput.edescription, noteInput.etag);

    setNoteInput({ id: "", etitle: "", edescription: "", etag: "" });
  };

  const onChange = (e) => {
    setNoteInput({ ...noteInput, [e.target.name]: e.target.value });
  };
  return (
    <div className="row yourNotes">
      <h1 className="my-3">Notes</h1>
      { state?.map((notes) => {
        return <NoteItem notes={notes} key={notes._id} updateNote={updateNote} />;
      })}

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      >
        Modal
      </button>

      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    value={noteInput.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={noteInput.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="(Optional) By default: 'General'"
                    onChange={onChange}
                    value={noteInput.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                disabled={noteInput.etitle.length < 3 || noteInput.edescription.length < 5}
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleClick}
              >
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
