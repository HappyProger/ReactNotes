import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Импортируем стили Bootstrap

function App() {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');

  const addNote = (event) => {
    event.preventDefault();

    if (newNoteText.trim()) {
      const newNote = {
        id: Date.now(),
        text: newNoteText,
       
      };

      setNotes([...notes, newNote]);
      setNewNoteText('');
    }
  };

  const toggleNoteCompletion = (id) => {
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          return { ...note, completed: !note.completed };
        }
        return note;
      })
    );
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-4">Notes</h1>
      <form className="add-note-form mb-4" onSubmit={addNote}>
        <div className="form-group">
          <textarea
            className="form-control"
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Write here"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add new note</button>
      </form>
      <ul className="list-group">
        {notes.map((note) => (
          <li key={note.id} className="list-group-item">
            <div>
              <input
                type="checkbox"
                className="note-checkbox mr-3"
                checked={note.completed}
                onChange={() => toggleNoteCompletion(note.id)}
              />
              <span className={note.completed ? "note-text completed" : "note-text"}>{note.text}</span>
            </div>
            <button className="btn btn-danger" onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
        
      </ul>
    </div>
  );
}

export default App;
