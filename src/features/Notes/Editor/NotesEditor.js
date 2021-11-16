import React from "react";
import style from "./NotesEditor.module.css";
import NoteModel from "features/Notes/NoteModel";

class NotesEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: "", content: "" };

    this.submit = this.submit.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }
  submit(event) {
    event.preventDefault();
    if (this.props.note) this.update();
    else this.create();

    this.setState(() => {
      return { title: "", content: "" };
    });

    if (this.props.onNoteSubmit) this.props.onNoteSubmit();
  }
  changeContent(event) {
    this.setState({ content: event.target.value });
  }
  changeTitle(event) {
    this.setState({ title: event.target.value });
  }
  create() {
    const dateNow = Date.now();
    const noteData = new NoteModel(
      dateNow,
      this.state.title,
      this.state.content
    );

    this.props.onNoteCreate(noteData);
  }
  update() {
    const dateNow = Date.now();
    const note = this.props.note;
    note.content = this.state.content;
    note.title = this.state.title;
    note.updateDate = dateNow;
    this.props.onNoteUpdate(note);
  }
  componentDidMount() {
    if (this.props.note) {
      this.setState(() => {
        return {
          title: this.props.note.title,
          content: this.props.note.content,
        };
      });
    }
  }
  render() {
    let buttonElementText;
    if (this.props.note) buttonElementText = "Update";
    else buttonElementText = "Add";

    return (
      <form onSubmit={this.submit} className={style.notesEditor}>
        <input
          className={style.titleInput}
          placeholder="Title"
          value={this.state.title}
          onChange={this.changeTitle}
        />
        <textarea
          className={style.contentTextArea}
          rows="10"
          placeholder="Your note..."
          value={this.state.content}
          onChange={this.changeContent}
          required
        ></textarea>
        <button className={style.submitButton} type="submit" value="submit">
          {buttonElementText}
        </button>
      </form>
    );
  }
}

export default NotesEditor;
