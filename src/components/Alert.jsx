import React from "react";

const Alert = (props) => {
  const { display, type, message } = props.alert;
  return (
    <div class={`alert alert-${type} ${display} mb-1 position-fixed w-100`} role="alert">
      {message}
    </div>
  );
};

export default Alert;
