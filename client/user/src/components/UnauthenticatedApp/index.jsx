import { useAuth } from "../../hooks/useAuth";
import "./styles.css";
import { KommunicateChat } from "../ChatWidget/guestBotIndex";

// Function to handle the unauthenticated user i.e., just display the login button
function UnauthenticatedApp() {
  const { login } = useAuth();

  return (
    <>
      <h2>LOGIN!</h2>
      <div>
        <button onClick={login} className="login">
          Login with Google
        </button>
      </div>
      <KommunicateChat></KommunicateChat>
    </>
  );
}
export { UnauthenticatedApp };
// Referenced from: https://blog.logrocket.com/how-to-build-chatroom-app-react-firebase/
