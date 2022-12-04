// import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Grid } from "@mui/material";
// window.Buffer = window.Buffer || require("buffer").Buffer;


function Feedback() {
  const [listOfFeedbacks, setListOfFeedbacks] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if (state == "" || state == null) {
      navigate('/');
    }
    else {
      const restaurantId = state.restaurantID
      const fetchFeedbacks = async () => {
        await fetch("https://tvxsf5q35rwastid7thszxhllm0mdaio.lambda-url.us-east-1.on.aws/",
          {
            method: "POST",
            body: JSON.stringify({
              restaurantId: restaurantId
            })
          })
          .then((res) => res.json()).then((res) => {
            if (res.status === 201) {
              alert("Error in finiding feedbacks.")
            }
            else {
              setListOfFeedbacks(res)
            }
          });
      }
      fetchFeedbacks();
    }
  }, []);

  return (
    <><div className="home_title">
      <div>
        <h1>Halifax Foodie</h1>
      </div>
    </div>
      <div className="btn" type="submit">
        <h3>User Feedback</h3>
      </div>
      <div>


        <iframe width="600" height="450" src="https://datastudio.google.com/embed/reporting/c5df5fe1-6273-4c34-b0c4-2c1c14e119d5/page/QeY9C" allowfullscreen></iframe>
      </div>
    </>
  );
}

export default Feedback;