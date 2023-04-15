import React, { useState, useRef } from "react";
import reverseWords from "../utils/reverseString";

interface Props {
  onChange?: (value: string) => void;
}

const RichTextArea: React.FC<Props> = ({ onChange }: any) => {
  const [content, setContent] = useState<any>("");
  const [editableDivStyle, setEditableDivStyle] = useState({
    border: "none",
    padding: "5px",
    ul: {
      padding: 0,
    },
  });
  const [showTextFormating, setShowTextFormating] = useState(false);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const editableDivRef = useRef<HTMLDivElement>(null);

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const value = reverseWords(e.currentTarget.innerHTML);
    setContent(value);
    if (onChange) {
      onChange(value);
    }
  };

  const execCommand = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value);
  };

  const addBulletPoint = () => {
    execCommand("insertUnorderedList");
  };

  const makeBold = () => {
    execCommand("bold");
  };

  const makeItalic = () => {
    execCommand("italic");
  };

  const addHyperlink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      execCommand("createLink", url);
    }
  };

  const handleFocus = () => {
    setPlaceholderVisible(false);
    setEditableDivStyle({
      ...editableDivStyle,
      border: "none",
    });
  };

  const handleBlur = () => {
    if (!content) {
      setPlaceholderVisible(true);
    }
    setEditableDivStyle({
      ...editableDivStyle,
      border: "none",
    });
  };

  const handlePlaceholderClick = () => {
    setPlaceholderVisible(false);
    editableDivRef.current?.focus();
  };

  const toolbarStyle = {
    padding: "0.25rem",
    borderRadius: "5px",
    border: "2px solid black",
    backgroundColor: "white",
    position: "absolute",
    top: "-20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "1rem",
    marginBottom: "10px",
  };

  return (
    <div
      onClick={() => setShowTextFormating(true)}
      onMouseLeave={() => setShowTextFormating(false)}
      style={{ position: "relative" }}
      className="rich-text-area"
    >
      {showTextFormating && (
        <div style={toolbarStyle}>
          <button onClick={addBulletPoint}>Bullet Point</button>
          <button onClick={makeBold}>Bold</button>
          <button onClick={makeItalic}>Italic</button>
          <button onClick={addHyperlink}>Hyperlink</button>
        </div>
      )}
      <div
        ref={editableDivRef}
        contentEditable
        style={editableDivStyle}
        onInput={handleContentChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  );
};

export default RichTextArea;
