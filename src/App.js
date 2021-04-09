import React, { useState } from "react";

import Heading from "./Components/Heading";
import NoteModal from "./Components/NoteModal";

export default function App() {
  const [noteModal, setNoteModal] = useState(false);

  const onNewNoteClicked = (e) => {
    e.preventDefault();
    setNoteModal(true);
  };

  return (
    <div className="App">
      <Heading onClick={onNewNoteClicked} />
      <NoteModal visible={noteModal} setVisible={setNoteModal} />
    </div>
  );
}
