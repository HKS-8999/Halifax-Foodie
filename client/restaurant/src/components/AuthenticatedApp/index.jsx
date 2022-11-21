import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../Landing";
import { ChatRoom } from "../ChatRoom";
import { SessionList } from "../SessionList";

function AuthenticatedApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/restaurant/chat/" element={<Landing />} />
        <Route path="/restaurant/chat/room/:id" element={<ChatRoom />} />
        <Route path="/restaurant/chat/room/:id/:id" element={<SessionList />} />
      </Routes>
    </BrowserRouter>
  );
}

export { AuthenticatedApp };
