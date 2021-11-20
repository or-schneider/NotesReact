import React from "react";
import style from "./NotesArchive.module.css";
import ArchiveNote from "./Note/ArchiveNote";
class NotesArchive extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }
  toggleVisibility() {
    this.setState((prevState) => {
      return { isVisible: !prevState.isVisible };
    });
  }
  render() {
    const { notes } = this.props;

    const archiveNotesElements = notes.map((note, index) => {
      note = notes[notes.length - 1 - index];
      return <ArchiveNote key={note.createDate} data={note}></ArchiveNote>;
    });
    return (
      <div className={style.archive}>
        <button
          className={
            style.visibilityButton +
            " " +
            (this.state.isVisible ? style.visibilityButtonActive : "")
          }
          onClick={this.toggleVisibility}
        >
          Archive
        </button>
        {this.state.isVisible ? <div>{archiveNotesElements}</div> : null}
      </div>
    );
  }
}

export default NotesArchive;
