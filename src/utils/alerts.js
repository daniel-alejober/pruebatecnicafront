import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export const handleAlert = (tipo, titulo, data, fn) => {
  let html = "";

  if (tipo === "error" && Array.isArray(data)) {
    html = `<ul style="list-style-type: none; padding: 0;">${data
      .map(
        (error) => `<li style="color: red; font-weight: bold;">${error}</li>`
      )
      .join("")}</ul>`;
  } else if (tipo === "success" && typeof data === "object") {
    html = `<ul style="list-style-type: none; padding: 0;">${Object.keys(data)
      .map((key) => `<li>${data[key]}</li>`)
      .join("")}</ul>`;
  }

  Swal.fire({
    icon: tipo,
    title: titulo,
    html,
    showConfirmButton: true,
    confirmButtonText: "Aceptar",
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      fn();
    }
  });
};
