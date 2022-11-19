import React from "react";
import { getSessions } from "../services/firebase";
// import { useAuth } from "../hooks/useAuth";

function useSessions(roomId) {
  const [sessions, setSessions] = React.useState([]);
  //   const { user } = useAuth();
  //   const sessionId = "yiy";

  React.useEffect(() => {
    const unsubscribe = getSessions(roomId, setSessions);
    return unsubscribe;
  }, [roomId]);

  console.log(sessions);
  return sessions;
}

export { useSessions };
