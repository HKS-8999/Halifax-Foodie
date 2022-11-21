import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../Landing";
import { ChatRoom } from "../ChatRoom";
import { SessionList } from "../SessionList";
import { RestaurantChat } from "../RestaurantChat";

function AuthenticatedApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/restaurant/chat/" element={<RestaurantChat />} />
        <Route path="/restaurant/chat/:id" element={<ChatRoom />} />
        <Route path="/restaurant/chat/:id/:id" element={<SessionList />} />
      </Routes>
    </BrowserRouter>
  );
}

export { AuthenticatedApp };
