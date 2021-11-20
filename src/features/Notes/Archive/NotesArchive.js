import React from "react";
import style from "./NotesArchive.module.css";

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
      </div>
    );
  }
}

export default NotesArchive;
