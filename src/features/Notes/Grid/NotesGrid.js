import React from "react";
import style from "./NotesGrid.module.css";
import Note from "./Note/GridNote";

class NotesGrid extends React.Component {
  render() {
    const { onDelete, notes } = this.props;
    const noteNodes = notes.map((note, index) => {
      note = notes[notes.length - 1 - index];
      return (
        <Note
          onDelete={onDelete}
          onClick={(note) => this.props.onNoteClick(note)}
          key={note.createDate}
          data={note}
        ></Note>
      );
    });
    return <div className={style.notesGrid}>{noteNodes}</div>;
  }
}

export default NotesGrid;
