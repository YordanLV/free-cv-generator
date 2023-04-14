import { useState } from "react";
import { useForm } from "react-hook-form";

export default function WorkItem({ style, data }) {
  const { register } = useForm();
  const [divPlaceholder, setDivPlaceholder] = useState(true);

  return (
    <div style={{ marginBottom: "0.75rem" }}>
      <input
        {...register("title")}
        placeholder="Title"
        value={data?.title}
        style={{
          ...style,
          ...{
            width: "100%",
            fontSize: "1rem",
            border: 0,
            backgroundColor: "transparent",
          },
        }}
        type="text"
      />
      <input
        {...register("company")}
        placeholder="Company"
        style={{
          ...style,
          ...{
            width: "100%",
            fontSize: "1rem",
            border: 0,
            backgroundColor: "transparent",
          },
        }}
        type="text"
      />
      <input
        {...register("date")}
        placeholder="DD/MM/YY"
        style={{
          ...style,
          ...{
            width: "100%",
            fontSize: "1rem",
            border: 0,
            backgroundColor: "transparent",
          },
        }}
        type="text"
      />
      <div
        {...register("responsibilities")}
        contentEditable
        onClick={() => setDivPlaceholder(false)}
        placeholder="What were your day-to-day responsibilities?"
        style={{
          ...style,
          ...{
            marginTop: "0.25rem",
            width: "100%",
            fontSize: "1rem",
            border: 0,
            backgroundColor: "transparent",
          },
        }}
      >
        {divPlaceholder && "Show me what you got"}
      </div>
    </div>
  );
}
