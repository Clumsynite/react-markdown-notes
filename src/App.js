import React, { useState } from "react";

import Heading from "./Components/Heading";
import NoteModal from "./Components/NoteModal";
import NoteCard from "./Components/NoteCard";

import "./App.css";

export default function App() {
  const [noteModal, setNoteModal] = useState(false);
  const [notes, setNotes] = useState(JSON.parse(localStorage.notes || "[]"));

  const onNewNoteClicked = (e) => {
    e.preventDefault();
    setNoteModal(true);
  };

  return (
    <div className="App">
      <Heading onClick={onNewNoteClicked} />
      <NoteModal visible={noteModal} setVisible={setNoteModal} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {notes.map((note, index) => (
          <NoteCard key={index} note={note} />
        ))}
      </div>
    </div>
  );
}
