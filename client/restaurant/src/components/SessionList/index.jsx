import { Link, useParams } from "react-router-dom";
import { sessionId } from "../../data/sessionIds";
import "./styles.css";
import { MessageInput } from "../MessageInput";
import { MessageList } from "../MessageList";
// import { SessionList } from "../SessionList";

function SessionList() {
  const params = useParams();

  const room = sessionId.find((x) => x.id === params.id);

  console.log("room" + room);
  if (!room) {
    // TODO: 404
  }

  return (
    <>
      <h2>{room.title}</h2>
      <div>
        <Link to="/">⬅️ Back to the rooms</Link>
      </div>
      {/* <div>
        <SessionList roomId={room.id} />
      </div> */}
      <div className="messages-container">
        <MessageList roomId={room.roomId} />
        <MessageInput roomId={room.roomId} />
      </div>
    </>
  );
}

export { SessionList };
