import { Link } from "react-router-dom";
import { chatRooms } from "../../data/chatRooms";
import "./styles.css";

function Landing() {
  return (
    <>
      <ul className="chat-room-list">
        <li>
          <Link to={`/restaurant/chat/`}>Customer Support</Link>
        </li>
      </ul>
    </>
  );
}

export { Landing };
