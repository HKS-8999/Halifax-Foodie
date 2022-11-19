import React from "react";
import { getMessages } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

function useMessages(roomId) {
  const [messages, setMessages] = React.useState([]);
  const { user } = useAuth();
  const sessionId = "yiy";

  React.useEffect(() => {
    const unsubscribe = getMessages(roomId, setMessages, user, sessionId);
    return unsubscribe;
  }, [roomId]);

  return messages;
}

export { useMessages };
