import { useState } from "react";
import { useForm } from "react-hook-form";
import FormatContenteditable from "../components/formatContenteditable/FormatContenteditable";

export default function WorkItem({ style, data }: any) {
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
      <FormatContenteditable />
    </div>
  );
}
