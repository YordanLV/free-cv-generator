export default function Block({ title, children }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
      <div style={{ width: "100%" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{title}</h2>
        <hr style={{ width: "100%" }} />
        {children}
      </div>
    </div>
  );
}
