import { createAsyncThunk } from "@reduxjs/toolkit";
import notify from "../../utils/notifications";
import { URL_API } from "../../config";
import { apiFetch } from "../apiService";
import logger from "../../utils/logger";

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
                notify.success(response.message, false)
                return (response.message);
            } else {
                throw `${response.message}`;
            }
        } catch (error) {
            // Gestionar errores
            notify.error(error, false)
            return thunkAPI.rejectWithValue({ continue: false });
        }
    }
);

export const changeRecoveryPassword = createAsyncThunk(
    "authSlice/changeRecoveryPassword", // Nombre de la acción
    async (data, thunkAPI) => {
        try {
            const response = await fetch(
                `${URL_API}/api/auth/forgot-password`,
                {
                    mode: "cors",
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            let datas = await response.json();
            logger.log(datas)
            if (datas.success) {
                notify.success(datas.message, false)
                return (datas.message);
            } else {
                throw `${datas.message}`;
            }
        } catch (error) {
            // Gestionar errores
            notify.error(error, false)
            return thunkAPI.rejectWithValue({ continue: false });
        }
    }
);

export const changeEmailRecovery = createAsyncThunk(
    "authSlice/changeEmailRecovery", // Nombre de la acción
    async (data, thunkAPI) => {
        try {
            const response = await fetch(
                `${URL_API}/api/auth/update-email-and-resend`,
                {
                    mode: "cors",
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            let datas = await response.json();
            logger.log(datas)
            if (datas.success) {
                notify.success(datas.message, false)
                return (datas.message);
            } else {
                throw `${datas.message}`;
            }
        } catch (error) {
            // Gestionar errores
            notify.error(error, false)
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
            logger.log(datas)
            if (datas.success) {
                notify.success(datas.message, false);
                return {
                    message: datas.message,
                };
            } else {
                throw `${datas.message}`;
            }
        } catch (error) {
            // Gestionar errores
            notify.error(error, false)
            return thunkAPI.rejectWithValue({ continue: false });
        }
    }
);