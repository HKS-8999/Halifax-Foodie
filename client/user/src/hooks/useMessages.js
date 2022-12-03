import React from "react";
import { getMessages } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

function useMessages(roomId) {
  const [messages, setMessages] = React.useState([]);
  const { user } = useAuth();
  const sessionId = "10eea881-0686-4e16-96dc-abf69fc07c6e";

  React.useEffect(() => {
    const unsubscribe = getMessages(roomId, setMessages, user, sessionId);
    return unsubscribe;
  }, [roomId]);

  return messages;
}

export { useMessages };
// Referenced from: https://blog.logrocket.com/how-to-build-chatroom-app-react-firebase/