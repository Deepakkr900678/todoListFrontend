import React, { useContext, useState } from "react";
import NotesContext from "../context/notes/NoteContext";

const AddNote = () => {
  const { addNotes } = useContext(NotesContext);

  const [noteInput, setNoteInput] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNotes(
      noteInput.title,
      noteInput.description,
      noteInput.tag === "" ? "General" : noteInput.tag
    );
    setNoteInput({ title: "", description: "", tag: "" });
  };
  const onChange = (e) => {
    setNoteInput({ ...noteInput, [e.target.name]: e.target.value });
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-warning addNote"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i class="fa-solid fa-plus"></i>
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add a note
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
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={onChange}
                    value={noteInput.title}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={onChange}
                    value={noteInput.description}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    placeholder="(Optional) By default: 'General'"
                    onChange={onChange}
                    value={noteInput.tag}
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
                disabled={noteInput.title.length < 3 || noteInput.description.length < 5}
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleClick}
              >
                Add note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNote;
