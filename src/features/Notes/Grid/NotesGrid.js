import React from "react";
import style from "./NotesGrid.module.css";
import Note from "./Note/GridNote";
class NotesGrid extends React.Component {
  render() {
    const noteNodes = this.props.notes.map((note) => {
      return <Note key={note.createDate} data={note}></Note>;
    });
    return <div className={style.notesGrid}>{noteNodes}</div>;
  }
}

export default NotesGrid;
