import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../Landing";
import { ChatRoom } from "../ChatRoom";
import { SessionList } from "../SessionList";
import { RestaurantChat } from "../RestaurantChat";
import Feedback from "../Polarity";
import Similarity from "../Similarity";
import UploadImageToS3WithNativeSdk from "../DataProcessing/DataProcessing";

function AuthenticatedApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/restaurant/chat/" element={<RestaurantChat />} />
        <Route path="/restaurant/chat/:id" element={<ChatRoom />} />
        <Route path="/restaurant/chat/:id/:id" element={<SessionList />} />
        <Route path="/" element={<Landing />} />
        <Route path="/customerFeedbackPolarity" element={<Feedback />} />
        <Route
          path="/uploadRecipe"
          element={
            <UploadImageToS3WithNativeSdk></UploadImageToS3WithNativeSdk>
          }
        />
        <Route path="/similarity" element={<Similarity />} />

      </Routes>
    
    </BrowserRouter>
  );
}

export { AuthenticatedApp };
