import React from "react";
import style from "./NotesGrid.module.css";
import Note from "./Note/GridNote";
class NotesGrid extends React.Component {
  render() {
    return (
      <div className={style.notesGrid}>
        <Note></Note>
        <Note></Note>
        <Note></Note>
        <Note></Note>
        <Note></Note>
        <Note></Note>
        <Note></Note>
        <Note></Note>
        <Note></Note>
        <Note></Note>
        <Note></Note>
        <Note></Note>
      </div>
    );
  }
}

export default NotesGrid;
