function DynamicTextArea({
  onInput,
  onChange,
  cols,
  rows,
  value,
  placeholder,
  isRequired,
  className,
}) {
  function handleInput(event) {
    fitTextAreaToContent(event);
    if (onInput) onInput(event);
  }
  function fitTextAreaToContent(event) {
    let offset = event.target.offsetHeight - event.target.clientHeight;
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + offset + "px";
  }

  return (
    <textarea
      className={className}
      cols={cols}
      rows={rows}
      value={value}
      placeholder={placeholder}
      isrequired={isRequired}
      onInput={handleInput}
      onChange={onChange}
    ></textarea>
  );
}

export default DynamicTextArea;
