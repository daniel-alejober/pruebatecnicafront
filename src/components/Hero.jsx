import React from "react";
import { Box } from "@mui/material";

const Hero = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#eceff1",
        borderRadius: 3,
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: { xs: 6, sm: 10, md: 10, lg: 8 },
        height: "95%",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <p style={{ textAlign: "center" }}>
          <span
            style={{
              fontSize: "clamp(3rem, 7vw, 5rem)",
              color: "#22c55e",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            Wee
          </span>

          <span
            style={{ color: "#06b6d4", fontSize: "clamp(3rem, 7vw, 5rem)" }}
          >
            Claims
          </span>
          <span style={{ color: "#06b6d4" }}>&reg;</span>
        </p>
        <p
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            color: "#06b6d4",
            marginTop: 2,
            margin: 0,
            textAlign: "center",
          }}
        >
          For insurance companies
        </p>
      </Box>
    </Box>
  );
};

export default Hero;
