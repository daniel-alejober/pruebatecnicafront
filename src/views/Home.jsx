import React from "react";
import Grid from "@mui/material/Grid2";
import Hero from "../components/Hero";
import Form from "../components/Form";

const Home = () => {
  return (
    <Grid
      container
      sx={{
        height: { xs: "70vh", sm: "70vh", md: "100vh", lg: "100vh" },
        width: "100%",
        maxWidth: "100vw",
        gap: 5,
      }}
    >
      <Grid
        container
        size={{ xs: 12, sm: 12, md: 5, lg: 5 }}
        sx={{
          padding: 5,
          height: { xs: "20vh", sm: "20vh", md: "90vh", lg: "90vh" },
          maxHeight: { xs: "100vh", sm: "100vh", md: "95vh", lg: "95vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Hero />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
        sx={{
          marginTop: { xs: 10, sm: 20 },
          paddingBottom: { xs: 5, sm: 5 },
          margin: "0 auto",
        }}
      >
        <Form setOpenModalForm={null} dataRegistro={null} registros={null} />
      </Grid>
    </Grid>
  );
};

export default Home;
