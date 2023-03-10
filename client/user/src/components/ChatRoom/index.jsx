import { Link, useParams } from "react-router-dom";
import { chatRooms } from "../../data/chatRooms";
import "./styles.css";
import { MessageInput } from "../MessageInput";
import { MessageList } from "../MessageList";
import React, { Component }  from 'react';

function ChatRoom() {
  const params = useParams();

  const room = chatRooms.find((x) => x.id === params.id);

  console.log(room);
  if (!room) {
    // TODO: 404
  }

  return (
    <>
      <h2>{room.title}</h2>
      <div>
        <Link to="/">⬅️ Back to the homepage</Link>
      </div>
      <div className="messages-container">
        <MessageList roomId={room.id} />
        <MessageInput roomId={room.id} />
      </div>
    </>
  );
}

export { ChatRoom };

// Referenced from: https://blog.logrocket.com/how-to-build-chatroom-app-react-firebase/
