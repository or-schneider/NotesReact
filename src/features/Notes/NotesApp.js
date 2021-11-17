import React, { Component } from "react";
import style from "./App.module.css";
import NotesEditor from "features/Notes/Editor/NotesEditor";
import NotesGrid from "features/Notes/Grid/NotesGrid";
import AppModal from "features/Notes/Modal/Modal";
import { serializeJson, deserializeJson } from "./JsonSerializer";
class NotesApp extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: new Map(), viewNote: null };

    let notes = localStorage.getItem("notes");
    if (notes) {
      notes = deserializeJson(notes);
      this.state.notes = notes;
    }

    this.saveStorage = this.saveStorage.bind(this);
    this.addNote = this.addNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.viewNote = this.viewNote.bind(this);
    this.unViewNote = this.unViewNote.bind(this);
  }
  saveStorage() {
    const notes = this.state.notes;
    const notesJson = serializeJson(notes);
    console.log(notesJson);
    localStorage.setItem("notes", notesJson);
  }
  addNote(note) {
    this.setState(() => {
      const notes = this.state.notes;
      notes.set(note.createDate, note);
      this.saveStorage();

      return { notes };
    });
  }
  updateNote(note) {
    this.setState(() => {
      const notes = this.state.notes;
      const viewNote = this.state.viewNote;
      for (const key in note) {
        viewNote[key] = note[key];
      }

      this.saveStorage();

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

      this.saveStorage();

      return { notes };
    });
  }
  viewNote(note) {
    this.setState({ viewNote: note });
  }
  unViewNote() {
    this.viewNote(null);
  }
  render() {
    return (
      <div className={style.app}>
        <NotesEditor onNoteCreate={this.addNote}></NotesEditor>
        <NotesGrid
          onDelete={this.deleteNote}
          onNoteClick={this.viewNote}
          notes={this.state.notes}
        ></NotesGrid>
        <AppModal showModal={!!this.state.viewNote} close={this.unViewNote}>
          <NotesEditor
            note={this.state.viewNote}
            onNoteCreate={this.addNote}
            onNoteUpdate={this.updateNote}
            onNoteSubmit={this.unViewNote}
          ></NotesEditor>
        </AppModal>
      </div>
    );
  }
}

export default NotesApp;
