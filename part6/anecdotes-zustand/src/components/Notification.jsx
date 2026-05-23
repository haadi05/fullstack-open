import { useNotification as useNotification } from "../notificationStore";

const Notification = () => {
  const voteNotification = useNotification();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  return (
    <div>
      {voteNotification !== "" && <div style={style}>{voteNotification}</div>}
    </div>
  );
};

export default Notification;
