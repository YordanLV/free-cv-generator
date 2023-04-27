import { fieldsStyles } from "@/styles/fileds.style";
import ContentEditableWithPlaceholder from "../contentEditableWithPlaceholder/ContentEditableWithPlaceholder";

export default function TitleWithBr({
  defaultValue,
}: {
  defaultValue: string;
}) {
  return (
    <>
      <ContentEditableWithPlaceholder
        defaultValue={defaultValue}
        style={fieldsStyles.sectionStyle}
      />
      <hr
        style={{
          display: "block",
          height: "4px",
          border: "0",
          borderTop: "2px solid #000000",
          padding: "0",
          width: "100%",
          margin: 0,
        }}
      />
    </>
  );
}
