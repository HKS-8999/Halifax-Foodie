import { Link, useParams } from "react-router-dom";
import { sessionId } from "../../data/sessionIds";
import { useSessions } from "../../hooks/useSessions";
import "./styles.css";

function ChatRoom() {
  const params = useParams();

  const room = sessionId.find((x) => x.id === params.id);

  const sessions = useSessions(params.id);
  console.log("Sessions in chatroom:" + sessions);

  // console.log(room);
  if (!room) {
    // TODO: 404
  }

  return (
    <>
      <h2>Choose a Chat Session</h2>
      <div>
        <Link to="/">⬅️ Back to the rooms</Link>
      </div>
      <ul className="chat-room-list">
        {sessionId.map((room) => (
          <li key={room.id}>
            <Link to={`/restaurant/chat/${params.id}/${room.title}`}>
              Session ID: "{room.title}"
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export { ChatRoom };

// Referenced from: https://blog.logrocket.com/how-to-build-chatroom-app-react-firebase/
