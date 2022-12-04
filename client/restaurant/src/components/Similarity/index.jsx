import { Link, useParams } from "react-router-dom";
import React from 'react';
import Stack from '@mui/material/Stack';
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@mui/material";

export default function Similarity() {


	const [recipe, setRecipe] = useState('');
	const [data, setData] = useState([])


	// States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);
	const [recipeLabel, setRecipeLabel] = useState('');



	// Handling the Recipe change
	const handleRecipe = (e) => {
		setRecipe(e.target.value);
		setSubmitted(false);
	}

	// Handling the form submission and triggering lambda function which will add data to DynamoDb
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (recipe === '') {
			setError(true)
		}
		else {
			send();
			setSubmitted(true);
		}
	}

	const handleSimilarity = async (e) => {
		e.preventDefault();
		if (recipe === '') {
			setError(true)
		}
		else {
			checkSimilarRecipe();
		}
	}

	const checkSimilarRecipe = async (e) => {
		await fetch("https://a4deucsazdhqtdh4oncxhhathm0cebev.lambda-url.us-east-1.on.aws/",
			{
				method: "POST",
				body: JSON.stringify({
					type: recipeLabel
				})
			})
			.then((res) => res.json()).then((res) => {
				setData(res)
			}, []);
	}

	const send = async (e) => {
		
		await fetch("http://localhost:8080", {
			method: "POST",
			body: JSON.stringify({
				recipe: recipe
			})
		})
			.then((res) => res.json()).then((res) => {
				console.log(res)
				if (res.length) {
					if (res[0].confidence > res[1].confidence) {
						setRecipeLabel("NON-VEG")
					}
					else {
						setRecipeLabel("VEG")
					}
				}
				else {
					alert("Error in finiding recipe.")
				}
			});
	}
	// Showing success message
	const successMessage = () => {
		return (
			<div
				style={{
					display: submitted ? '' : 'none',
				}}>
				<h2>Recipe Uploaded!</h2>
			</div>
		);
	};

	// Showing error message if error is true
	const errorMessage = () => {
		return (
			<div
				style={{
					display: error ? '' : 'none',
				}}>
				<h2>Please enter all the fields</h2>
			</div>
		);
	};

	return (

		<div className="form">
			<div>
				<h1>Similarity Score</h1>
				<br />
			</div>

			<div className="messages">
				{errorMessage()}
				{successMessage()}
			</div>

			<form>
				<label className="label">Recipe Details: </label>
				<input onChange={handleRecipe} className="input"
					value={recipe} type="text" />
				<br />
				<br />
				<br />
				<Stack direction="row" spacing={2}>
				<Button variant="contained" onClick={handleSubmit} className="btn" type="submit">
					Submit
				</Button>
				<Button variant="contained" onClick={handleSimilarity} className="btn" type="submit">
					Check Similarity
				</Button>

				<Button variant="contained" className='btn' type='back'>
					<Link to="/">Back to Home</Link>
				</Button>
				</Stack>
			</form>
			<br></br>
			<br></br>
			<h2>
				Similar Recipes
			</h2>
			{data.length !== 0 ? data.map((d) => {
				return (
					<div>
						<br>
						</br>
						{d.recipe_name}
					</div>
				);
			}) : <p>No Similar Recipe</p>}

		</div>
	);
}

export { Similarity };