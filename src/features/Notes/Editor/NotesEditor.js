import React from "react";
import style from "./NotesEditor.module.css";
import NoteModel from "features/Notes/NoteModel";

class NotesEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { content: "" };

    this.submit = this.submit.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.create = this.create.bind(this);
  }
  submit(event) {
    event.preventDefault();

    this.create();
  }
  changeContent(event) {
    this.setState({ content: event.target.value });
  }
  create() {
    const dateNow = Date.now();
    const noteData = new NoteModel(dateNow, this.state.content);

    this.props.onNoteCreate(noteData);
  }
  render() {
    return (
      <form onSubmit={this.submit} className={style.notesEditor}>
        <textarea
          className={style.contentTextArea}
          rows="10"
          placeholder="Your note..."
          value={this.state.content}
          onChange={this.changeContent}
        ></textarea>
        <button className={style.submitButton} type="submit" value="submit">
          Add
        </button>
      </form>
    );
  }
}

export default NotesEditor;
