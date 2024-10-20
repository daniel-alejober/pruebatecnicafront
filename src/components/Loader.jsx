import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({ loading }) => {
  return (
    <Backdrop open={loading} style={{ zIndex: "900" }}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default Loader;
