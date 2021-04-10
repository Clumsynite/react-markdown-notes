import React, { useEffect, useState } from "react";

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

  const deleteNote = (index) => {
    const notes = JSON.parse(localStorage.notes || "[]");
    if (notes.length > 0) {
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      setNotes(notes);
    }
  };

  useEffect(() => {
    setNotes(JSON.parse(localStorage.notes || "[]"));
  }, [noteModal]);

  return (
    <div className="App">
      <Heading onClick={onNewNoteClicked} />
      {noteModal && <NoteModal visible={noteModal} setVisible={setNoteModal} />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 0",
        }}
      >
        {notes.map((note, index) => (
          <NoteCard
            key={index}
            note={note}
            index={index}
            deleteNote={deleteNote}
          />
        ))}
      </div>
    </div>
  );
}
