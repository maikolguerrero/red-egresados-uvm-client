import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../../config";
import notify from "../../utils/notifications";

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
          notify.success("Egresado verificado", true);
        } else {
          notify.error("No se encontró al egresado con esta cédula", true);
        }
        return data;
      } else {
        return rejectWithValue(data.message || "Error al verificar egresado");
      }
    } catch (error) {
      notify.error(error.message, false);
      return rejectWithValue(error.message);
    }
  }
);