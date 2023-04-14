export default function TitleWithBr({
  sectionTitle,
  children,
}: {
  sectionTitle: string;
  children: any;
}) {
  return (
    <>
      <h2
        style={{
          marginTop: "12px",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        {sectionTitle}
      </h2>
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
      {children}
    </>
  );
}
