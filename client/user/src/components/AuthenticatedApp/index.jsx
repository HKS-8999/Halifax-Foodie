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
<<<<<<< HEAD
        <Route path="user/chat/:id" element={<UserChat />} />
        <Route path="/user/chat/:id/room/:id" element={<ChatRoom />} />
        <Route path="/user/customerFeedback" element={<CustomerFeedback />} />
=======
        <Route path="user/:id/chat/:id" element={<UserChat />} />
        <Route path="/user/:id/chat/:id/room/:id" element={<ChatRoom />} />
>>>>>>> 8bc6e52c898ee7bef0cfc05d705dbeea6ef1f0b8
      </Routes>
    </BrowserRouter>
  );
}

export { AuthenticatedApp };

// Referenced from: https://blog.logrocket.com/how-to-build-chatroom-app-react-firebase/