import React from "react";
import style from "./NotesGrid.module.css";
import Note from "./Note/GridNote";
class NotesGrid extends React.Component {
  render() {
    const { onDelete, notes } = this.props;
    const noteNodes = [];
    notes.forEach((note) => {
      noteNodes.push(
        <Note onDelete={onDelete} key={note.createDate} data={note}></Note>
      );
    });
    return <div className={style.notesGrid}>{noteNodes}</div>;
  }
}

export default NotesGrid;
