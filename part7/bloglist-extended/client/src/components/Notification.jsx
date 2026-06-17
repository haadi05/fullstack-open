import { Alert } from "@mui/material";
import useNotification from "../hooks/useNotification";

const Notification = () => {
  const { notification } = useNotification();
  return (
    <div>
      {notification !== null && (
        <Alert
          className={notification.type}
          style={{ marginTop: 10, marginBottom: 10 }}
          severity={notification.type}
        >
          {notification.message}
        </Alert>
      )}
    </div>
  );
};

export default Notification;
