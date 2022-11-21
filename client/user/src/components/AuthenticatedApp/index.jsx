import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../Landing";
import { ChatRoom } from "../ChatRoom";
import { UserChat } from "../UserChat";

function AuthenticatedApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="user/chat/:id" element={<UserChat />} />
        <Route path="/user/chat/:id/room/:id" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export { AuthenticatedApp };
