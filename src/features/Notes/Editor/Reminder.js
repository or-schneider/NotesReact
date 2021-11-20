import React from "react";
import DatetimePicker from "react-datetime-picker";
class EditorReminder extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  onChange(value) {
    this.props.onSet(value);
  }
  render() {
    return (
      <div>
        <DatetimePicker
          onChange={this.onChange}
          value={this.props.value}
        ></DatetimePicker>
      </div>
    );
  }
}
export default EditorReminder;
