import React from "react";

const ErrorFormik = ({ errorMsg, errorTouch }) => {
  return (
    errorMsg &&
    errorTouch && <p style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</p>
  );
};

export default ErrorFormik;
