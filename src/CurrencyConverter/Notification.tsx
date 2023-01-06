import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { ReactElement } from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return (
    <MuiAlert
      sx={{ minWidth: "30ch" }}
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
    />
  );
});

interface NotificationProps {
  isOpen: boolean;
  message: string;
  closeNotification: VoidFunction;
}

function Notification({
  isOpen,
  message,
  closeNotification,
}: NotificationProps): ReactElement {
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      closeNotification();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={isOpen}
      onClose={closeNotification}
    >
      <Alert
        sx={{ cursor: "pointer" }}
        onClick={closeNotification}
        severity="error"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
