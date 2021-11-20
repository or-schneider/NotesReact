import React from "react";
import style from "./ArchiveNote.module.css";

class ArchiveNote extends React.Component {
  render() {
    const { data } = this.props;
    const { onClick } = this.props;
    return (
      <div className={style.archiveNote} onClick={() => onClick(data)}>
        <p className={style.archiveNoteText}>
          {data.title !== "" ? data.title : "Untitled"}
        </p>
      </div>
    );
  }
}

export default ArchiveNote;
