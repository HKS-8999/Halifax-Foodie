import { Link } from "react-router-dom";
import { chatRooms } from "../../data/chatRooms";
import "./styles.css";

function RestaurantChat() {
  return (
    <>
      <h2>Choose a Chat Room</h2>
      <div>
        <Link to="/">⬅️ Back to the homepage</Link>
      </div>
      <ul className="chat-room-list">
        {chatRooms.map((room) => (
          <li key={room.id}>
            <Link to={`/restaurant/chat/${room.id}`}>{room.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export { RestaurantChat };
