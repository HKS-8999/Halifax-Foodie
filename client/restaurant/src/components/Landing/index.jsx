import { Link } from "react-router-dom";
import { chatRooms } from "../../data/chatRooms";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Landing() {
  const navigate = useNavigate();

  const [data, setData] = useState([{}]);

  const restaurantId = "test@dal.ca";
  // Handling the form submission
  const handleMachineLearning = async (e) => {
    e.preventDefault();
    navigate("/machineLearning");
  };
  const handlePolarityCheck = async (e) => {
    await fetch(
      "https://tvxsf5q35rwastid7thszxhllm0mdaio.lambda-url.us-east-1.on.aws/",
      {
        method: "POST",
        body: JSON.stringify({
          restaurantId: restaurantId,
        }),
      }
    ).then((response) => {
      if (response.status === 201) {
        alert("No Reviews Sorry Come back later");
      } else {
        response.json().then((r) => {
          setData(r);
          // navigate('/customerFeedbackPolarity')
        });
      }
    });
  };
  return (
    <>
      <div className="home_title">
        <button OnClick="handleMachineLearning" className="btn" type="submit">
          Machine Learning
        </button>

        {/* <button onClick={() => handlePolarityCheck()} className="btn" type="submit"> */}
        <button
          onClick={() =>
            navigate("/customerFeedbackPolarity", {
              state: { restaurantID: restaurantId },
            })
          }
        >
          Analyze Customer Feedback
        </button>
      </div>
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
