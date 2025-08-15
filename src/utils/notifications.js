import { enqueueSnackbar } from 'notistack';
import { typeSuccess, typeError, typeWarning, typeInfo } from "./alertModels";
import { VITE_NODE_ENV } from '../config';

const dev = VITE_NODE_ENV === 'development';

const notify = {
    success: (message, onlyDev) => {
        if ((onlyDev && dev) || !onlyDev) {
            enqueueSnackbar(message, typeSuccess);
        }
    },

    error: (message, onlyDev = false) => {
        if ((onlyDev && dev) || !onlyDev) {
            enqueueSnackbar(message, typeError);
        }
    },

    errorDefault: (
        message = "Ocurrió un error inesperado. Por favor, verifica tu conexión a internet e inténtalo de nuevo más tarde.",
        onlyDev = false
    ) => {
        if ((onlyDev && dev) || !onlyDev) {
            enqueueSnackbar(message, typeError);
        }
    },

    warning: (message, onlyDev = false) => {
        if ((onlyDev && dev) || !onlyDev) {
            enqueueSnackbar(message, typeWarning);
        }
    },

    info: (message, onlyDev = false) => {
        if ((onlyDev && dev) || !onlyDev) {
            enqueueSnackbar(message, typeInfo);
        }
    }
};

export default notify;
