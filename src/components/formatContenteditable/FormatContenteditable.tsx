import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import style from "./FormatContenteditable.module.css";

interface EditButtonProps {
  cmd: string;
  arg?: string;
  name?: string;
}

const FormatContenteditable: React.FC = () => {
  const [html, setHtml] = useState<string>("");
  const [isPlaceholderShown, setIsPlaceholderShown] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(false);
  const contentEditable = useRef<ContentEditable>(null);

  const placeholder =
    "Please write a good description and use bullet points to show what you have done";

  const [editable, setEditable] = useState<boolean>(true);

  const handleChange = (evt: ContentEditableEvent) => {
    setHtml(evt.target.value);
  };

  const onPlaceHolderClick = () => {
    setIsPlaceholderShown(false);
    contentEditable.current?.focus();
  };

  const handleBlur = () => {
    if (html.trim() === "") {
      setIsPlaceholderShown(false);
    }
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
    <div
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      style={{ position: "relative" }}
    >
      <ContentEditable
        className={style.editablecontent}
        innerRef={contentEditable}
        tagName="div"
        html={html}
        disabled={!editable}
        onChange={handleChange}
        onClick={() => setIsPlaceholderShown(false)}
        onBlur={handleBlur}
      />
      {isPlaceholderShown && (
        <div
          onClick={onPlaceHolderClick}
          style={{ position: "absolute", top: 0, width: "100%" }}
        >
          {placeholder}
        </div>
      )}
      {showControls && (
        <div className="flex flex-row gap-1 mt-2.5">
          <EditButton cmd="italic" />
          <EditButton cmd="bold" />
          <EditButton cmd="insertUnorderedList" name="bullet" />
          {/* <EditButton
            cmd="createLink"
            arg="https://github.com/lovasoa/react-contenteditable"
            name="hyperlink"
          /> */}
        </div>
      )}
    </div>
  );
};

const EditButton: React.FC<EditButtonProps> = (props) => {
  const saveSelection = () => {
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel?.getRangeAt && sel?.rangeCount) {
        const range = sel.getRangeAt(0);
        return range;
      }
    }
    return null;
  };

  const restoreSelection = (range: Range | null) => {
    if (range && window.getSelection) {
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  const handleMouseDown = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const savedRange = saveSelection();
    document.execCommand(props.cmd, false, props.arg);
    if (savedRange) {
      restoreSelection(savedRange);
      ContentEditable.current?.focus();
    }
  };

  return (
    <button
      className="border border-zinc-900 hover:bg-slate-200 text-black font-bold py-1 px-1 rounded"
      key={props.cmd}
      onMouseDown={handleMouseDown}
    >
      {props.name || props.cmd}
    </button>
  );
};

export default FormatContenteditable;
