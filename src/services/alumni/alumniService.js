import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../../config";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";

export const verifyAlumni = createAsyncThunk(
  'alumni/verifyAlumni',
  async (cedula, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${URL_API}/api/alumni/verify-alumni/${cedula}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      
      if (data.success) {
        if (data.esEgresado) {
          enqueueSnackbar("Egresado verificado", typeSuccess);
        } else {
          enqueueSnackbar("No se encontró egresado con esta cédula", typeError);
        }
        return data;
      } else {
        return rejectWithValue(data.message || "Error al verificar egresado");
      }
    } catch (error) {
      enqueueSnackbar(error.message, typeError);
      return rejectWithValue(error.message);
    }
  }
);