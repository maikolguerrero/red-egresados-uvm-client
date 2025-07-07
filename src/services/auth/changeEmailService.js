import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { typeError, typeSuccess } from "../../models/alertModels";
import { URL_API } from "../../config";
import { apiFetch } from "../apiService";

export const changeRecoveryEmail = createAsyncThunk(
    "authSlice/changeRecoveryEmail", // Nombre de la acción
    async (data, thunkAPI) => {
        try {
            const response = await apiFetch(
                `/api/auth/change-email`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.success) {
                enqueueSnackbar(response.message, typeSuccess)
                return (response.message);
            } else {
                throw `${response.message}`;
            }
        } catch (error) {
            // Gestionar errores
            enqueueSnackbar(error, typeError)
            return thunkAPI.rejectWithValue({ continue: false });
        }
    }
);

export const changeEmail = createAsyncThunk(
    "authSlice/changeEmail", // Nombre de la acción
    async (data, thunkAPI) => {
        try {
            const response = await fetch(
                `${URL_API}/api/auth/verify-email-change?token=${data}`,
                {
                    mode: "cors",
                    credentials: "include",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            let datas = await response.json();
            console.log(datas)
            if (datas.success) {
                enqueueSnackbar(datas.message, typeSuccess);
                return {
                    message: datas.message,
                };
            } else {
                throw `${datas.message}`;
            }
        } catch (error) {
            // Gestionar errores
            enqueueSnackbar(error, typeError)
            return thunkAPI.rejectWithValue({ continue: false });
        }
    }
);