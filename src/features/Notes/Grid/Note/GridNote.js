import React from "react";
import style from "./GridNote.module.css";
import formatDate from "./formatDate";

class GridNote extends React.Component {
  render() {
    if (!this.props.data) return null;
    const { createDate, title, content, updateDate } = this.props.data;
    const formattedCreateDate = formatDate(createDate);

    let updateDateElement;
    if (updateDate) {
      let formattedUpdateDate = formatDate(updateDate);
      updateDateElement = (
        <div className={style.date}>Updated: {formattedUpdateDate}</div>
      );
    }

    let titleElement = null;
    if (title.length > 0)
      titleElement = <h3 className={style.title}>{title}</h3>;
    return (
      <div
        className={
          style.gridNote + " " + (this.props.onClick ? style.button : "")
        }
        onClick={() => {
          if (this.props.onClick) this.props.onClick(this.props.data);
        }}
      >
        <div className={style.header}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (this.props.onDelete) this.props.onDelete(this.props.data);
            }}
            className={style.deleteButton}
          >
            &#10006;
          </button>
        </div>
        {titleElement}
        <p className={style.content}>{content}</p>
        <div className={style.date}>Created: {formattedCreateDate}</div>
        {updateDateElement}
      </div>
    );
  }
}

export default GridNote;
