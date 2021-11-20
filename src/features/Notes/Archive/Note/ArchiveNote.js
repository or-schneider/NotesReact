import React from "react";

class ArchiveNote extends React.Component {
  render() {
    const { data } = this.props;
    const { onClick } = this.props;
    return (
      <div onClick={() => onClick(data)}>
        {data.title !== "" ? data.title : "Untitled"}
      </div>
    );
  }
}

export default ArchiveNote;
