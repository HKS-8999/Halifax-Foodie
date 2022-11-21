import { Link, useParams } from "react-router-dom";
import { sessionId } from "../../data/sessionIds";
import "./styles.css";
import { MessageInput } from "../MessageInput";
import { MessageList } from "../MessageList";

function SessionList() {
  const params = useParams();

  const session = sessionId.find((x) => x.id === params.id);

  console.log("room" + session);
  if (!session) {
    // TODO: 404
  }

  return (
    <>
      <h2>{session.title}</h2>
      <div>
        <Link to="/">⬅️ Back to the rooms</Link>
      </div>
      <div className="messages-container">
        <MessageList roomId={session.roomId} />
        <MessageInput roomId={session.roomId} />
      </div>
    </>
  );
}

export { SessionList };
