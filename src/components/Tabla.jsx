import React, { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { localization } from "../utils/localization";
import { Box, Typography, Button, Tooltip, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Loader from "./Loader";
import clientAxios from "../clienteAxios";
import { handleAlert } from "../utils/alerts";
import { useNavigate } from "react-router-dom";
import ModalForm from "./ModalForm";

const Tabla = () => {
  const [loading, setLoading] = useState(false);
  const [dataRegistros, setDataRegistros] = useState([]);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [dataRegistro, setDataRegistro] = useState(null);
  const navigate = useNavigate();

  const registros = async () => {
    try {
      const response = await clientAxios.get("/registro");
      if (response.data) {
        setDataRegistros(response.data);
      }
    } catch (error) {
      setLoading(false);
      handleAlert(
        "error",
        "Error al obtener los registros",
        error.response.data.errores,
        () => {}
      );
    }
  };

  useEffect(() => {
    registros();
  }, []);

  const abrirFormulario = (dataRegistro) => {
    setDataRegistro(dataRegistro);
    setOpenModalForm(true);
  };

  const eliminarRegistro = async (dataRegistro) => {
    try {
      const response = await clientAxios.delete(
        `/registro/${dataRegistro._id}`
      );
      if (response.data && response.data.success) {
        setLoading(false);
        await registros();
        handleAlert(
          "success",
          "Registro Eliminado Correctamente",
          {},
          () => {}
        );
      }
    } catch (error) {
      setLoading(false);
      handleAlert(
        "error",
        "Error al obtener los registros",
        error.response.data.errores,
        () => {}
      );
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "company",
        header: "Compañia",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },

      {
        accessorKey: "contact",
        header: "Contacto",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "email",
        header: "Correo",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "tel",
        header: "Telefono",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        header: "Editar",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        Cell: ({ row: { original } }) => (
          <IconButton onClick={() => abrirFormulario(original)}>
            <Tooltip title="Editar">
              <Edit color="primary" />
            </Tooltip>
          </IconButton>
        ),
      },
      {
        header: "Eliminar",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        Cell: ({ row: { original } }) => (
          <IconButton onClick={() => eliminarRegistro(original)}>
            <Tooltip title="Eliminar">
              <Delete color="red" />
            </Tooltip>
          </IconButton>
        ),
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data: dataRegistros,
    localization,
  });

  return (
    <Box sx={{ maxWidth: "95%", margin: "0 auto" }}>
      {openModalForm && (
        <ModalForm
          openModalForm={openModalForm}
          setOpenModalForm={setOpenModalForm}
          dataRegistro={dataRegistro}
          registros={registros}
        />
      )}
      <Typography color="primary" variant="h6">
        Registros
      </Typography>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <MaterialReactTable table={table} />
      )}
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Regresar
        </Button>
      </Box>
    </Box>
  );
};

export default Tabla;
