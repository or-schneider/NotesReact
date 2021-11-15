import React, { Component } from "react";
import style from "./App.module.css";
import NotesEditor from "features/Notes/Editor/NotesEditor";
class NotesApp extends Component {
  render() {
    return (
      <div className={style.app}>
        <NotesEditor></NotesEditor>
      </div>
    );
  }
}

export default NotesApp;
