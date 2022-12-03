import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../Landing";
import { ChatRoom } from "../ChatRoom";
import { UserChat } from "../UserChat";

function AuthenticatedApp() {
  return (
    <BrowserRouter>
      {/* <KommunicateChat></KommunicateChat> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="user/:id/chat/:id" element={<UserChat />} />
        <Route path="/user/:id/chat/:id/room/:id" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export { AuthenticatedApp };

// Referenced from: https://blog.logrocket.com/how-to-build-chatroom-app-react-firebase/