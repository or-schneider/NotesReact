import React from "react";
import style from "./NotesEditor.module.css";

class NotesEditor extends React.Component {
  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Submitted Form");
        }}
        className={style.notesEditor}
      >
        <textarea
          className={style.contentTextArea}
          rows="10"
          placeholder="Your note..."
        ></textarea>
        <button className={style.submitButton} type="submit">
          Add
        </button>
      </form>
    );
  }
}

export default NotesEditor;
