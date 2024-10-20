import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import Form from "./Form";

const ModalForm = ({
  openModalForm,
  setOpenModalForm,
  dataRegistro,
  registros,
}) => {
  const handleCloseModal = (event, reason) => {
    if (reason === "backdropClick") {
      return false;
    }

    if (reason === "escapeKeyDown") {
      return false;
    }

    if (typeof onClose === "function") {
      return true;
    }
  };
  return (
    <Dialog
      open={openModalForm}
      onClose={handleCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="lg"
    >
      <DialogContent>
        <Form
          setOpenModalForm={setOpenModalForm}
          dataRegistro={dataRegistro}
          registros={registros}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ModalForm;
