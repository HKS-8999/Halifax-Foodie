import { Link } from "react-router-dom";
import "./styles.css";

import React, { Component } from 'react';

function Landing() {
  return (
    <div>
       <ul className="chat-room-list">
      <h2>Welcome!</h2>
        <li>
          <Link to="/user/customerFeedback">Give Feedback</Link>
        </li>
      </ul>

    </div>
     

// {/* // Function to render the landing page of the user module */}

  );
}

export { Landing };
// {/* // Referenced from: https://blog.logrocket.com/how-to-build-chatroom-app-react-firebase/ */}
