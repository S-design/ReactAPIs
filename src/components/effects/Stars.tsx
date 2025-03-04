import "./Stars.scss";

export default function Stars() {
  return (
    <div className="stars-container">
      {Array.from({ length: 100 }).map((_, i) => (
        <div key={i} className="star"></div>
      ))}
    </div>
  );
}
