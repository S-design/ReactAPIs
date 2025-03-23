import React from "react";
import "./styles/Cborg.css";

const Cborg: React.FC = () => {
  return (
    <div className="cyborg-container">
      <div className="cyborg">
        <div className="eye left"></div>
        <div className="eye right"></div>
        <div className="mouth"></div>
        <div className="wires"></div>
      </div>
    </div>
  );
};

export default Cborg;
