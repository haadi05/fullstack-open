import { Alert } from "@mui/material";

const Notification = ({ notification, errorMsg }) => {
  return (
    <div>
      {notification !== "" && (
        <Alert
          className="notification"
          style={{ marginTop: 10, marginBottom: 10 }}
          severity="success"
        >
          {notification}
        </Alert>
      )}

      {errorMsg !== "" && (
        <Alert
          className="errorMsg"
          style={{ marginTop: 10, marginBottom: 10 }}
          severity="error"
        >
          {errorMsg}
        </Alert>
      )}
    </div>
  );
};

export default Notification;
