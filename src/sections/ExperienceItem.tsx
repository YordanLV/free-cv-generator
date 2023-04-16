import { useState } from "react";
import { useForm } from "react-hook-form";
import FormatContenteditable from "../components/formatContenteditable/FormatContenteditable";
import customStyle from "./ExperienceItem.module.css";

export default function ExperienceItem({ style, data }: any) {
  const { register } = useForm();

  return (
    <>
      <div style={{ marginBottom: "0.75rem" }}>
        <input
          {...register("title")}
          placeholder="Title"
          value={data?.title}
          className={customStyle.experience}
          style={{
            ...style,
          }}
          type="text"
        />
        <input
          {...register("company")}
          placeholder="Company"
          className={customStyle.experience}
          style={{
            ...style,
          }}
          type="text"
        />
        <input
          {...register("date")}
          placeholder="DD/MM/YY"
          className={customStyle.experience}
          style={{
            ...style,
          }}
          type="text"
        />
        <FormatContenteditable />
      </div>
    </>
  );
}
