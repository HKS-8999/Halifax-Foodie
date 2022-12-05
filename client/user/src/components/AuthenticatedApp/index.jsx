import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../Landing";
import { ChatRoom } from "../ChatRoom";
import { UserChat } from "../UserChat";
import {CustomerFeedback} from "../CustomerFeedback"
import React, { Component }  from 'react';

//Function to route the pages after authentication 
function AuthenticatedApp() {
  return (
    <BrowserRouter>
      {/* <KommunicateChat></KommunicateChat> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="user/chat/:id" element={<UserChat />} />
        <Route path="/user/:id/chat/:id/room/:id" element={<ChatRoom />} />
        <Route path="/user/customerFeedback" element={<CustomerFeedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export { AuthenticatedApp };

// Referenced from: https://blog.logrocket.com/how-to-build-chatroom-app-react-firebase/