import React, { Component } from "react";
import style from "./App.module.css";
import NotesEditor from "features/Notes/Editor/NotesEditor";
import NotesGrid from "features/Notes/Grid/NotesGrid";
class NotesApp extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: new Map() };

    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }
  addNote(note) {
    this.setState(() => {
      const notes = this.state.notes;
      notes.set(note.createDate, note);
      return { notes };
    });
  }
  deleteNote(note) {
    if (!window.confirm("Are you sure you want to delete your note?")) {
      return;
    }
    this.setState(() => {
      const notes = this.state.notes;
      notes.delete(note.createDate);
      return { notes };
    });
  }
  render() {
    return (
      <div className={style.app}>
        <NotesEditor onNoteCreate={this.addNote}></NotesEditor>
        <NotesGrid
          onDelete={this.deleteNote}
          notes={this.state.notes}
        ></NotesGrid>
      </div>
    );
  }
}

export default NotesApp;
