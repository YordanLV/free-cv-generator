import { useState } from "react";
import { useForm } from "react-hook-form";
import FormatContenteditable from "../components/formatContenteditable/FormatContenteditable";
import { styles } from "./ExperienceItem.style";

export default function ExperienceItem({ style, data }: any) {
  const { register } = useForm();

  return (
    <>
      <div style={{ marginBottom: "0.75rem" }}>
        <input
          {...register("title")}
          placeholder="Title"
          value={data?.title}
          style={{
            ...style,
            ...styles.experience,
          }}
          type="text"
        />
        <input
          {...register("company")}
          placeholder="Company"
          style={{
            ...style,
            ...styles.experience,
          }}
          type="text"
        />
        <input
          {...register("date")}
          placeholder="DD/MM/YY"
          style={{
            ...style,
            ...styles.experience,
          }}
          type="text"
        />
        <FormatContenteditable />
      </div>
    </>
  );
}
