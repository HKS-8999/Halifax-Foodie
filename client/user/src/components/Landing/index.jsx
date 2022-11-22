import { Link } from "react-router-dom";
import { chatRooms } from "../../data/chatRooms";
import "./styles.css";

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
