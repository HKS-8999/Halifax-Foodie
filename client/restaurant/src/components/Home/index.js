import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function Home() {
    const navigate = useNavigate();

    const [data, setData] = useState([{}])

    const restaurantId = "test@dal.ca"
    // Handling the form submission
    const handleMachineLearning = async (e) => {
        e.preventDefault();
        navigate('/machineLearning') 
    };
    const handlePolarityCheck = async (e) => {
        
        await fetch("https://tvxsf5q35rwastid7thszxhllm0mdaio.lambda-url.us-east-1.on.aws/" , 
        {
            method: "POST",
            body: JSON.stringify({
                restaurantId: restaurantId
            })
        })
        .then((response) => {
            if(response.status === 201){
            alert("No Reviews Sorry Come back later")
            }
            else{
                response.json().then((r)=> {
                    setData(r)
                   // navigate('/customerFeedbackPolarity') 
                })
            }
        })
    }
    return (
        <div className="home_title">
            <div>
                <h1>Halifax Foodie</h1>
            </div>
            <button OnClick = "handleMachineLearning" className="btn" type="submit">
            Machine Learning
            </button>

            {/* <button onClick={() => handlePolarityCheck()} className="btn" type="submit"> */}
            <button onClick={() => navigate('/customerFeedbackPolarity', { state : {restaurantID : restaurantId} }) }> 
            Analyze Customer Feedback
            </button>
        </div>
    );
}