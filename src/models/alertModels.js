const defaultAlert = {
  autoHideDuration: 3000,
  anchorOrigin: {
    vertical: "top",
    horizontal: "right",
  },
};

export const typeSuccess = {
  ...defaultAlert,
  variant: "success",
};
export const typeError = {
  ...defaultAlert,
  variant: "error",
};
export const typeWarning = {
  ...defaultAlert,
  variant: "warning",
};
export const typeInfo = {
  ...defaultAlert,
  variant: "info",
};