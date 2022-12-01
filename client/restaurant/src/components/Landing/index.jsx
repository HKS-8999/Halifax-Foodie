import { useNavigate, Link } from "react-router-dom";
import { chatRooms } from "../../data/chatRooms";
import "./styles.css";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";

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
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          OnClick="handleMachineLearning"
          className="btn"
          type="submit"
        >
          Machine Learning
        </Button>
        {/* <button onClick={() => handlePolarityCheck()} className="btn" type="submit"> */}
        <Button
          variant="contained"
          onClick={() =>
            navigate("/customerFeedbackPolarity", {
              state: { restaurantID: restaurantId },
            })
          }
        >
          Analyze Customer Feedback
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            navigate("/uploadRecipe", { state: { restaurantID: restaurantId } })
          }
        >
          Upload Recipe
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            navigate("/restaurant/chat/", {
              state: { restaurantID: restaurantId },
            })
          }
        >
          Customer Support Rooms
        </Button>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <h2>Recipe Statistics</h2>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<iframe width='600' height='450' src='https://datastudio.google.com/embed/reporting/ab67af24-0af0-46b0-9856-cc14469a589a/page/MvD8C' frameborder='0' style='border:0' allowfullscreen></iframe>",
            }}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          {" "}
          <h2>Login Statistics</h2>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<iframe width='600' height='450' src='https://datastudio.google.com/embed/reporting/314192fd-086a-4b46-abff-5bcd21b0ffe3/page/pyD8C' frameborder='0' style='border:0' allowfullscreen></iframe>",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export { Landing };
