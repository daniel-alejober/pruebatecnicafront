import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorFormik from "./ErrorFormik";
import { Box, TextField, Typography, Checkbox, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import clientAxios from "../clienteAxios";
import Loader from "./Loader";
import { handleAlert } from "../utils/alerts";

const Form = ({ setOpenModalForm, dataRegistro, registros }) => {
  const [checked, setChecked] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    company: Yup.string().required("El nombre de la compañía es requerido."),
    contact: Yup.string()
      .matches(
        /^[a-zA-ZÀ-ÿ\s]+$/,
        "El nombre del contacto solo puede contener letras."
      )
      .required("El nombre del contacto es requerido."),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "El correo electrónico no es válido."
      )
      .required("El email es requerido."),
    tel: Yup.string()
      .matches(/^\d{10}$/, "El teléfono debe tener exactamente 10 dígitos.")
      .required("El teléfono es requerido."),
  });

  const initialValues = {
    company: dataRegistro && dataRegistro.company ? dataRegistro.company : "",
    contact: dataRegistro && dataRegistro.contact ? dataRegistro.contact : "",
    email: dataRegistro && dataRegistro.email ? dataRegistro.email : "",
    tel: dataRegistro && dataRegistro.tel ? dataRegistro.tel : "",
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setDisabledButton(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (!checked && !dataRegistro) {
        setDisabledButton(true);
        return;
      }
      setLoading(true);
      try {
        let response;
        let msg = "";
        if (dataRegistro) {
          response = await clientAxios.put(
            `/registro/${dataRegistro._id}`,
            values
          );
          msg = "Registro Actualizado Correctamente";
          setOpenModalForm(false);
          await registros();
        } else {
          response = await clientAxios.post(`/registro`, values);
          msg = "Registro Guardado Correctamente";
        }

        if (response.data && response.data.success) {
          setLoading(false);
          handleAlert("success", msg, response.data.registro, () =>
            navigate("/registros")
          );
        }
      } catch (error) {
        setLoading(false);
        handleAlert(
          "error",
          "Error guardar el registro",
          error.response.data.errores,
          () => {}
        );
      }
    },
  });

  return (
    <Box sx={{ maxWidth: "95%", margin: "0 auto" }}>
      {loading && <Loader loading={loading} />}
      <Typography color="primary" variant="h6">
        {dataRegistro ? "Edidar Registro Persona" : "Registro Persona"}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="company"
          name="company"
          onChange={formik.handleChange}
          value={formik.values.company}
          label="Nombre de la compañia"
          type="text"
          fullWidth
          style={{ margin: "10px 0" }}
        />
        <ErrorFormik
          errorMsg={formik.errors.company}
          errorTouch={formik.touched.company}
        />
        <TextField
          id="contact"
          name="contact"
          onChange={formik.handleChange}
          value={formik.values.contact}
          label="Nombre de la persona para contacto"
          type="text"
          fullWidth
          style={{ margin: "10px 0" }}
        />
        <ErrorFormik
          errorMsg={formik.errors.contact}
          errorTouch={formik.touched.contact}
        />

        <TextField
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          label="Correo electrónico"
          type="text"
          fullWidth
          style={{ margin: "10px 0" }}
        />
        <ErrorFormik
          errorMsg={formik.errors.email}
          errorTouch={formik.touched.email}
        />

        <TextField
          id="tel"
          name="tel"
          onChange={formik.handleChange}
          value={formik.values.tel}
          label="Teléfono"
          type="number"
          fullWidth
          style={{ margin: "10px 0" }}
        />
        <ErrorFormik
          errorMsg={formik.errors.tel}
          errorTouch={formik.touched.tel}
        />
        {!dataRegistro && (
          <Box
            sx={{
              textAlign: { xs: "center", sm: "center", md: "left", lg: "left" },
            }}
          >
            <Checkbox checked={checked} onChange={handleChange} />
            <span style={{ marginRight: "5px" }}>He leído y acepto el</span>
            <Link to="/terminoscondiciones">
              Aviso de privacidad/Términos y condiciones
            </Link>
          </Box>
        )}
        {disabledButton && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            Debe aceptar los terminos y condiciones
          </p>
        )}

        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={disabledButton}
          >
            Continuar
          </Button>
          {dataRegistro && (
            <Button
              style={{ marginLeft: "15px" }}
              variant="contained"
              color="red"
              onClick={() => setOpenModalForm(false)}
            >
              Cancelar
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default Form;
