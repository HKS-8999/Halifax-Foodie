import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../Landing";
import { ChatRoom } from "../ChatRoom";
import { SessionList } from "../SessionList";
import { RestaurantChat } from "../RestaurantChat";
import Home from "../Home";
import Feedback from "../Polarity";
import UploadImageToS3WithNativeSdk from "../DataProcessing/DataProcessing";

function AuthenticatedApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Landing />} />
        <Route path="/restaurant/chat/" element={<RestaurantChat />} />
        <Route path="/restaurant/chat/:id" element={<ChatRoom />} />
        <Route path="/restaurant/chat/:id/:id" element={<SessionList />} />
        <Route path="/" element={<Home />} />
        <Route path="/customerFeedbackPolarity" element={<Feedback />} />
        <Route
          path="/uploadRecipe"
          element={
            <UploadImageToS3WithNativeSdk></UploadImageToS3WithNativeSdk>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export { AuthenticatedApp };
