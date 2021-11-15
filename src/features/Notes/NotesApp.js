import React, { Component } from "react";
import style from "./App.module.css";
import NotesEditor from "features/Notes/Editor/NotesEditor";
import NotesGrid from "features/Notes/Grid/NotesGrid";
import NoteModel from "./NoteModel";
class NotesApp extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: [] };

    this.addNote = this.addNote.bind(this);
  }
  addNote(note) {
    const notes = this.state.notes;
    notes.push(note);

    this.setState({ notes });
  }
  render() {
    let note = new NoteModel("wwww", "wasas");
    return (
      <div className={style.app}>
        <NotesEditor
          onNoteCreate={this.addNote}
          modifyNote={note}
        ></NotesEditor>
        <NotesGrid notes={this.state.notes}></NotesGrid>
      </div>
    );
  }
}

export default NotesApp;
