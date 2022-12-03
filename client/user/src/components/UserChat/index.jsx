import { Link, useParams } from "react-router-dom";
import { chatRooms } from "../../data/chatRooms";
import "./styles.css";

function UserChat() {
  const params = useParams();
  console.log(params.id);
  return (
    <>
      <h2>Choose a Chat Room</h2>
      <div>
        <Link to="/">⬅️ Back to the homepage</Link>
      </div>
      <ul className="chat-room-list">
        {chatRooms.map((room) => (
          <li key={room.id}>
            <Link
              to={`/user/menu@feasts.com/chat/${params.id}/room/${room.id}`}
            >
              {room.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export { UserChat };
// Referenced from: https://blog.logrocket.com/how-to-build-chatroom-app-react-firebase/