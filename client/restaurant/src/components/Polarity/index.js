// import './App.css';
import React , {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'; 
// window.Buffer = window.Buffer || require("buffer").Buffer;


function Feedback()
{
  const [listOfFeedbacks, setListOfFeedbacks] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if( state == "" || state == null){
    navigate('/');
    }
    else{

         
        
        // {
        //     method: "POST",
        //     body: JSON.stringify({
        //         restaurantId: restaurantId
        //     })
        // })
        // .then((response) => {
        //     if(response.status === 201){
        //     alert("No Reviews Sorry Come back later")
        //     }
        //     else{
        //         response.json().then((r)=> {
        //             setData(r)
        //             console.log(r)
        //            // navigate('/customerFeedbackPolarity') 
        //         })
        //     }
        // })





        const restaurantId = state.restaurantID
        const fetchFeedbacks = async () =>{
        await fetch("https://tvxsf5q35rwastid7thszxhllm0mdaio.lambda-url.us-east-1.on.aws/" ,
        {
            method: "POST",
            body: JSON.stringify({
              restaurantId: restaurantId
            })
          })
          .then((res) => res.json()).then((res)=>{ 
            if(res.status === 201){
                alert("Error in finiding feedbacks.")
            }
            else{
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
      </div><div className="btn" type="submit">
              <h3>User Feedback</h3>
              {listOfFeedbacks.length !== 0 ? listOfFeedbacks.map((d) => {
                  return (

                      // Reference : https://mui.com/material-ui/react-card/#OutlinedCard.js
                      <React.Fragment>
                          <Box sx={{ minWidth: 275 }}>
                              <Card variant="outlined">
                                  <CardContent>
                                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                          User ID: {d.user_id}
                                      </Typography>
                                      <Typography sx={{ mb: 1.5 }} variant="h6" component="div">
                                          Polarity: {d.sentiment}
                                      </Typography>
                                      <Typography color="text.secondary">
                                          Feedback
                                      </Typography>
                                      <Typography variant="body2">
                                          {d.feedback}
                                      </Typography>
                                  </CardContent>
                              </Card>
                          </Box>
                      </React.Fragment>
                      
                  );
              }) : <p>No data</p>}

          </div></>
  );
}

export default Feedback;