import { useForm } from "react-hook-form";

export default function WorkItem({ style }) {
  const { register } = useForm();
  return (
    <div>
      <input
        {...register("title")}
        placeholder="Title"
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
        placeholder="What were your day-to-day responsibilities?"
        style={{
          ...style,
          ...{
            width: "100%",
            fontSize: "1rem",
            border: 0,
            backgroundColor: "transparent",
          },
        }}
      ></div>
    </div>
  );
}
