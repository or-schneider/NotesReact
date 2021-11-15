import React from "react";
import style from "./GridNote.module.css";

class GridNote extends React.Component {
  render() {
    const { createData, content } = this.props.data;
    return (
      <div className={style.gridNote}>
        <div className={style.content}>{content}</div>
      </div>
    );
  }
}

export default GridNote;
