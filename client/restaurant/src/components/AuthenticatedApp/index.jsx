import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../Landing";
import { ChatRoom } from "../ChatRoom";
import { SessionList } from "../SessionList";

function AuthenticatedApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/room/:id" element={<ChatRoom />} />
        <Route path="/room/general/:id" element={<SessionList />} />
      </Routes>
    </BrowserRouter>
  );
}

export { AuthenticatedApp };
