import React from "react";

class ArchiveNote extends React.Component {
  render() {
    const { data } = this.props;
    return <div>{data.title !== "" ? data.title : "Untitled"}</div>;
  }
}

export default ArchiveNote;
