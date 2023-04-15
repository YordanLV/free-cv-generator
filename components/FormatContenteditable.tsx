import React, { useState } from "react";
import ReactDOM from "react-dom";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

const FormatContenteditable = () => {
  const [html, setHtml] = useState(
    `<p>Hello <b>World</b> !</p><p>Paragraph 2</p>`
  );
  const [editable, setEditable] = useState(true);

  const handleChange = (evt) => {
    setHtml(evt.target.value);
  };

  const sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1", "ul", "li"],
    allowedAttributes: { a: ["href"] },
  };

  const sanitize = () => {
    setHtml(sanitizeHtml(html, sanitizeConf));
  };

  const toggleEditable = () => {
    setEditable(!editable);
  };

  return (
    <div>
      <h3>editable contents</h3>
      <ContentEditable
        className="editable"
        tagName="pre"
        html={html}
        disabled={!editable}
        onChange={handleChange}
        onBlur={sanitize}
      />
      <h3>source</h3>
      <textarea
        className="editable"
        value={html}
        onChange={handleChange}
        onBlur={sanitize}
      />
      <h3>actions</h3>
      <EditButton cmd="italic" />
      <EditButton cmd="bold" />
      <EditButton cmd="formatBlock" arg="h1" name="heading" />
      <EditButton cmd="insertUnorderedList" name="bullet" />
      <EditButton
        cmd="createLink"
        arg="https://github.com/lovasoa/react-contenteditable"
        name="hyperlink"
      />
      <button onClick={toggleEditable}>
        Make {editable ? "readonly" : "editable"}
      </button>
    </div>
  );
};

function EditButton(props) {
  return (
    <button
      key={props.cmd}
      onMouseDown={(evt) => {
        evt.preventDefault();
        document.execCommand(props.cmd, false, props.arg);
      }}
    >
      {props.name || props.cmd}
    </button>
  );
}

export default FormatContenteditable;
