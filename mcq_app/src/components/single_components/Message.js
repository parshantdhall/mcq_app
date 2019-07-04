import React from "react";
import "../../stylesheets/_Message.scss";

const Message = props => {
  return (
    <div className="notify-msg" style={props.msgStyle}>
      <p>{props.messageText}</p>
    </div>
  );
};

export default Message;
