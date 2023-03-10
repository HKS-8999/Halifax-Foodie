import React from "react";
import { getMessages } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

// Function to recieve the message in real-time into the web application using useEffect()
function useMessages(roomId) {
  const [messages, setMessages] = React.useState([]);
  const { user } = useAuth();

  React.useEffect(() => {
    const unsubscribe = getMessages(roomId, setMessages, user, sessionId);
    return unsubscribe;
  }, [roomId]);

  return messages;
}

export { useMessages };

// Referenced from: https://blog.logrocket.com/how-to-build-chatroom-app-react-firebase/