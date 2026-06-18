import { Alert } from "@mui/material";
import useBlogContext from "../hooks/useBlogContext";

const Notification = () => {
  const { notification } = useBlogContext();
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
