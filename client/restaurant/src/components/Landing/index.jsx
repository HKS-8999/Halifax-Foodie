import { Link } from "react-router-dom";
import { chatRooms } from "../../data/chatRooms";
import "./styles.css";

function Landing() {
  return (
    <>
      <ul className="chat-room-list">
        <li>
          <Link to={`/restaurant/chat/`}>Customer Support</Link>
        </li>
      </ul>
      <h2>Recipe Statistics</h2>
      <div
        dangerouslySetInnerHTML={{
          __html:
            "<iframe width='600' height='450' src='https://datastudio.google.com/embed/reporting/ab67af24-0af0-46b0-9856-cc14469a589a/page/MvD8C' frameborder='0' style='border:0' allowfullscreen></iframe>",
        }}
      />
      <h2>Login Statistics</h2>
      <div
        dangerouslySetInnerHTML={{
          __html:
            "<iframe width='600' height='450' src='https://datastudio.google.com/embed/reporting/314192fd-086a-4b46-abff-5bcd21b0ffe3/page/pyD8C' frameborder='0' style='border:0' allowfullscreen></iframe>",
        }}
      />
    </>
  );
}

export { Landing };
