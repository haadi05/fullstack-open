import React from "react";

const Notification = ({ notification, errorMsg }) => {
  return (
    <div>
      {notification !== "" && <p className="notification">{notification}</p>}
      {errorMsg !== "" && <p className="errorMsg">{errorMsg}</p>}
    </div>
  );
};

export default Notification;
