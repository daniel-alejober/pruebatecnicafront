import React from "react";
import { terminosCondiciones } from "../terminosCondiciones";
import { Link } from "react-router-dom";

const TerminosCondiciones = () => {
  return (
    <div style={{ margin: "15px" }}>
      <Link to="/" style={{ fontWeight: "bold", fontSize: 20 }}>
        Volver
      </Link>
      {terminosCondiciones.map((tc) => (
        <div key={tc.titulo}>
          <p style={{ textAlign: "center", fontWeight: "bold" }}>{tc.titulo}</p>
          <p style={{ textAlign: "justify" }}>{tc.texto}</p>
        </div>
      ))}
    </div>
  );
};

export default TerminosCondiciones;
