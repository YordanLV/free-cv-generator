export default function Education({ school, city, major, gpa }) {
  return (
    <div>
      <div>{school}</div>
      <div>{city}</div>
      <div>{major}</div>
      {gpa && <div>{gpa}</div>}
    </div>
  );
}
