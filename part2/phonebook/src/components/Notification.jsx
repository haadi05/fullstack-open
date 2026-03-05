const Notification = ({ message, alertToggle }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={alertToggle ? "notification" : "error"}>{message}</div>
  );
};

export default Notification;
