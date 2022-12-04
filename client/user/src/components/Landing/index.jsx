import { Link } from "react-router-dom";
import "./styles.css";
import React, { Component } from 'react';

function Landing() {
  return (
    <>
      <ul className="chat-room-list">
        <li>
          <Link to="/user/chat/yh43">Chat Support</Link>
        </li>
        <li>
          <Link to="/user/customerFeedback">Give Feedback</Link>
        </li>
      </ul>
    </>
  );
}

export { Landing };
