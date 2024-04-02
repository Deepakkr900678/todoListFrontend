import React from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";

function Home() {
  return (
    <>
      <div className="container bg">
        <AddNote />
        <Notes />
      </div>
    </>
  );
}

export default Home;
