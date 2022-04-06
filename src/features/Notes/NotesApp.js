import React, { Component } from "react";
import localForage from "localforage";
import style from "./App.module.css";
import NotesEditor from "features/Notes/Editor/NotesEditor";
import NotesGrid from "features/Notes/Grid/NotesGrid";
import AppModal from "features/Notes/Modal/Modal";
import NotesArchive from "features/Notes/Archive/NotesArchive";
import startNoteReminderTimeout from "./startNoteReminderTimeout";
class NotesApp extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: new Map(), viewNote: null };

    this.saveStorageAsync = this.saveStorageAsync.bind(this);
    this.addNote = this.addNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.archiveNote = this.archiveNote.bind(this);
    this.restoreArchiveNote = this.restoreArchiveNote.bind(this);
    this.viewNote = this.viewNote.bind(this);
    this.unViewNote = this.unViewNote.bind(this);
  }
  componentDidMount() {
    this.loadStorageAsync();
    this.enableAutosaveStorage();
  }

  async loadStorageAsync() {
    for (const [, note] of this.state.notes) {
      if (note.reminderTimeout) {
        clearTimeout(note.reminderTimeout);
        note.reminderTimeout = null;
      }
    }
    let notes = await localForage.getItem("notes");
    if (!notes) return;

    for (const [, note] of notes) {
      if (note.isArchived) continue;
      if (note.reminderDate)
        note.reminderTimeout = startNoteReminderTimeout(note);
    }

    this.setState({ notes });
  }
  enableAutosaveStorage() {
    window.addEventListener("beforeunload", this.saveStorageAsync);
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

      clearTimeout(note.reminderTimeout);
      note.reminderTimeout = null;

      return { notes };
    });
  }
  archiveNote(note) {
    if (!window.confirm("Are you sure you want to archive your note?")) {
      return;
    }
    this.setState(() => {
      const notes = this.state.notes;
      note = notes.get(note.createDate);
      note.isArchived = true;

      clearTimeout(note.reminderTimeout);
      note.reminderTimeout = null;

      return { notes };
    });
  }
  restoreArchiveNote(note) {
    this.setState(() => {
      const notes = this.state.notes;
      note = notes.get(note.createDate);
      note.isArchived = false;
      if (note.reminderDate)
        note.reminderTimeout = startNoteReminderTimeout(note);

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
    const notes = [];
    const archivedNotes = [];
    for (const [, note] of this.state.notes) {
      if (note.isArchived) archivedNotes.push(note);
      else notes.push(note);
    }
    return (
      <div className={style.app}>
        <div className={style.content}>
          <NotesEditor onNoteCreate={this.addNote}></NotesEditor>
          <NotesGrid
            onDelete={this.archiveNote}
            onNoteClick={this.viewNote}
            notes={notes}
          ></NotesGrid>
        </div>
        <NotesArchive
          onRestoreNote={this.restoreArchiveNote}
          onDeleteNote={this.deleteNote}
          notes={archivedNotes}
        ></NotesArchive>

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
