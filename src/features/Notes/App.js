import React, { Component } from "react";
import style from "./App.module.css";
import NotesEditor from "features/Notes/Editor/NotesEditor";
import NotesGrid from "features/Notes/Grid/NotesGrid";
class NotesApp extends Component {
  render() {
    return (
      <div className={style.app}>
        <NotesEditor></NotesEditor>
        <NotesGrid></NotesGrid>
      </div>
    );
  }
}

export default NotesApp;
