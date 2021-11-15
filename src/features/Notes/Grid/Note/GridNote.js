import React from "react";
import style from "./GridNote.module.css";

class GridNote extends React.Component {
  render() {
    return (
      <div className={style.gridNote}>
        <div className={style.content}>Demo Content</div>
      </div>
    );
  }
}

export default GridNote;
