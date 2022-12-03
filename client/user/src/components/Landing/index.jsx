import { Link } from "react-router-dom";
import { chatRooms } from "../../data/chatRooms";
import "./styles.css";
// Function to render the landing page of the user module
function Landing() {
  return (
    <>
      <ul className="chat-room-list">
        <li>
          <Link to="/user/chat/yh43">Chat Support</Link>
        </li>
      </ul>
    </>
  );
}

export { Landing };
// Referenced from: https://blog.logrocket.com/how-to-build-chatroom-app-react-firebase/
