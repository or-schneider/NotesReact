import React, { Component } from "react";
import localForage from "localforage";
import style from "./App.module.css";
import NotesEditor from "features/Notes/Editor/NotesEditor";
import NotesGrid from "features/Notes/Grid/NotesGrid";
import AppModal from "features/Notes/Modal/Modal";
import NotesArchive from "features/Notes/Archive/NotesArchive";
class NotesApp extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: new Map(), viewNote: null };

    this.saveStorage = this.saveStorageAsync.bind(this);
    this.addNote = this.addNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.viewNote = this.viewNote.bind(this);
    this.unViewNote = this.unViewNote.bind(this);
  }
  componentDidMount() {
    this.loadStorageAsync();
    this.enableAutosaveStorage();
  }
  async loadStorageAsync() {
    let notes = await localForage.getItem("notes");
    if (notes) {
      this.setState({ notes });
    }
  }
  enableAutosaveStorage() {
    document.addEventListener("beforeunload", this.saveStorageAsync);
    window.addEventListener("blur", () => this.saveStorageAsync());

    window.addEventListener("storage", () => {
      this.loadStorageAsync();
    });
  }
  async saveStorageAsync() {
    const notes = this.state.notes;
    await localForage.setItem("notes", notes);

    let dispatchStorageEventTrigger = localStorage.getItem(
      "dispatchStorageEventTrigger"
    );
    dispatchStorageEventTrigger = dispatchStorageEventTrigger === "true";
    dispatchStorageEventTrigger = !dispatchStorageEventTrigger;
    localStorage.setItem(
      "dispatchStorageEventTrigger",
      dispatchStorageEventTrigger
    );
  }
  addNote(note) {
    this.setState((prevState) => {
      const notes = prevState.notes;
      notes.set(note.createDate, note);

      return { notes };
    });
  }
  updateNote(note) {
    this.setState((prevState) => {
      const notes = prevState.notes;
      const viewNote = prevState.viewNote;
      for (const key in note) {
        viewNote[key] = note[key];
      }

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

      this.saveStorageAsync();

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
        <div className={style.content}>
          <NotesEditor onNoteCreate={this.addNote}></NotesEditor>
          <NotesGrid
            onDelete={this.deleteNote}
            onNoteClick={this.viewNote}
            notes={this.state.notes}
          ></NotesGrid>
        </div>
        <NotesArchive></NotesArchive>

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
