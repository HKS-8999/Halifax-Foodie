import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { sendMessage } from "../../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

// Function to handle the message inputs and send them to the funtcion in services

function MessageInput({ roomId }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [value, setValue] = React.useState("");
  const sessionId = "10eea881-0686-4e16-96dc-abf69fc07c6e";

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const endSession = (res) => {
    // axios
    //   .get(
    //     "https://us-central1-b00899473-csci5410-365518.cloudfunctions.net/g8-hfxfoodie-end-pub"
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //     return res.status(200).json({
    //       message: response.data.ip,
    //     });
    //   })
    //   .catch((err) => {
    //     return res.status(500).json({
    //       error: err,
    //     });
    //   });

    let path = `/`;
    navigate(path);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(roomId, user, value, sessionId);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-container">
      <input
        type="text"
        placeholder="Enter a message"
        value={value}
        onChange={handleChange}
        className="message-input"
        required
        minLength={1}
      />
      <button type="submit" disabled={value < 1} className="send-message">
        Send
      </button>
      <button
        onclick={endSession()}
        disabled={value < 1}
        className="end-message"
      >
        <Link to="/">End Session</Link>
      </button>
    </form>
  );
}
export { MessageInput };

// Referenced from: https://blog.logrocket.com/how-to-build-chatroom-app-react-firebase/