import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { sendMessage } from "../../services/firebase";
import "./styles.css";

function MessageInput({ roomId }) {
  const { user } = useAuth();
  const [value, setValue] = React.useState("");
  const sessionId = "10eea881-0686-4e16-96dc-abf69fc07c6e";

  const handleChange = (event) => {
    setValue(event.target.value);
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
    </form>
  );
}
export { MessageInput };
