import React from "react";
import { getSessions } from "../services/firebase";
// import { useAuth } from "../hooks/useAuth";

function useSessions(roomId) {
  const [sessions, setSessions] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = getSessions(roomId, setSessions);
    return unsubscribe;
  }, [roomId]);

  console.log("Sessions in useSessions" + sessions);
  return sessions;
}

export { useSessions };

// Referenced from: https://blog.logrocket.com/how-to-build-chatroom-app-react-firebase/
