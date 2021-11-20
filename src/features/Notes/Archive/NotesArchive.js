import React from "react";
import style from "./NotesArchive.module.css";
import ArchiveNote from "./Note/ArchiveNote";
import AppModal from "features/Notes/Modal/Modal";
import NoteView from "features/Notes/Grid/Note/GridNote";

class NotesArchive extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false, selectedNote: null };

    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.unselectNote = this.unselectNote.bind(this);
    this.restoreSelectedNote = this.restoreSelectedNote.bind(this);
    this.deleteSelectedNote = this.deleteSelectedNote.bind(this);
  }
  toggleVisibility() {
    this.setState((prevState) => {
      return { isVisible: !prevState.isVisible };
    });
  }
  selectNote(note) {
    this.setState({ selectedNote: note });
  }
  unselectNote() {
    this.setState({ selectedNote: null });
  }
  restoreSelectedNote() {
    const note = this.state.selectedNote;
    this.props.onRestoreNote(note);
    this.unselectNote();
  }
  deleteSelectedNote() {
    const note = this.state.selectedNote;
    this.props.onDeleteNote(note);
    this.unselectNote();
  }
  render() {
    const { notes } = this.props;
    const { selectedNote } = this.state;
    const archiveNotesElements = notes.map((note, index) => {
      note = notes[notes.length - 1 - index];
      return (
        <ArchiveNote
          onClick={this.selectNote}
          key={note.createDate}
          data={note}
        ></ArchiveNote>
      );
    });

    return (
      <div className={style.archive}>
        <button
          className={
            style.button +
            " " +
            (this.state.isVisible ? style.visibilityButtonActive : "")
          }
          onClick={this.toggleVisibility}
        >
          Archive
        </button>
        {this.state.isVisible && archiveNotesElements.length > 0 ? (
          <div className={style.notes}>{archiveNotesElements}</div>
        ) : null}

        <AppModal showModal={!!selectedNote} close={this.unselectNote}>
          <NoteView onDelete={this.unselectNote} data={selectedNote}>
            <button onClick={this.restoreSelectedNote} className={style.button}>
              Restore
            </button>
            <button onClick={this.deleteSelectedNote} className={style.button}>
              Delete
            </button>
          </NoteView>
        </AppModal>
      </div>
    );
  }
}

export default NotesArchive;
