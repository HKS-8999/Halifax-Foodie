import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';


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
          
            <Stack direction="row" spacing={2}>
                <Button variant = "contained" OnClick = "handleMachineLearning" className="btn" type="submit">
                Machine Learning
                </Button>
                {/* <button onClick={() => handlePolarityCheck()} className="btn" type="submit"> */}
                <Button variant = "contained" onClick={() => navigate('/customerFeedbackPolarity', { state : {restaurantID : restaurantId} }) }> 
                Analyze Customer Feedback
                </Button>
                <Button variant = "contained" onClick={() => navigate('/uploadRecipe', { state : {restaurantID : restaurantId} }) }> 
                Upload Recipe
                </Button>
            </Stack>
    );
}