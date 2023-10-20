"use client";

import useErrorStore from "@/zustandStore/errorStore";
import { Alert, Snackbar } from "@mui/material";
import React, { FC, PropsWithChildren } from "react";
import { useShallow } from "zustand/react/shallow";

const ErrorContainer: FC<PropsWithChildren> = ({ children }) => {
  const { hasError, errorMessage, removeError } = useErrorStore(
    useShallow((state) => ({
      errorMessage: state.errorMessage,
      hasError: state.hasError,
      removeError: state.removeError,
    }))
  );

  return (
    <>
      {children}
      <Snackbar
        open={hasError}
        autoHideDuration={5000}
        onClose={removeError}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert
          onClose={removeError}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Nešto nije uredu, javi Igoru da pogleda!
          {process.env.NODE_ENV === "development" && errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ErrorContainer;
