import React from "react";
import style from "./GridNote.module.css";
import formatDate from "./formatDate";

class GridNote extends React.Component {
  render() {
    const { createDate, title, content } = this.props.data;
    const formattedDate = formatDate(createDate);

    let titleElement = null;
    if (title.length > 0)
      titleElement = <h3 className={style.title}>{title}</h3>;

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
        {titleElement}
        <p className={style.content}>{content}</p>
      </div>
    );
  }
}

export default GridNote;
