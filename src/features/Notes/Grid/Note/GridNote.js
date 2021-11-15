import React from "react";
import style from "./GridNote.module.css";
import formatDate from "./formatDate";

class GridNote extends React.Component {
  render() {
    const { createDate, content } = this.props.data;
    const formattedDate = formatDate(createDate);
    return (
      <div className={style.gridNote}>
        <div className={style.header}>
          <div className={style.date}>{formattedDate}</div>
          <button
            onClick={() => this.props.onDelete(this.props.data)}
            className={style.deleteButton}
          >
            &#10006;
          </button>
        </div>
        <div className={style.content}>{content}</div>
      </div>
    );
  }
}

export default GridNote;
