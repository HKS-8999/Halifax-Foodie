import { Link, useParams } from "react-router-dom";
import React from 'react';
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

export default function CustomerFeedback() {
	// States for feedback
	const [name, setName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [restEmail, setRestEmail] = useState('');
	const [feedBack, setFeedback] = useState('');
	const { state } = useLocation();
	const navigate = useNavigate();

	// States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	// Handling the name change
	const handleName = (e) => {
		setName(e.target.value);
		setSubmitted(false);
	};

	// Handling the user email change
	const handleUserEmail = (e) => {
		setUserEmail(e.target.value);
		setSubmitted(false);
	};

	// Handling the restaurant email change
	const handleRestEmail = (e) => {
		setRestEmail(e.target.value);
		setSubmitted(false);
	};

	// Handling the Feedback change
	const handleFeedback = (e) => {
		setFeedback(e.target.value);
		setSubmitted(false);
	}

	// Handling the form submission and triggering lambda function which will add data to DynamoDb
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (restEmail === '' || name === '' || userEmail === '' || feedBack === '') {
			setError(true)
		}
		else {
			sendToDynamo();
		}
	}

	const sendToDynamo = async (e) => {

		const restaurant_id = restEmail
		const user_id = userEmail
		const feedback = feedBack
		const current_id = Date.now()
		await fetch("https://a4524rntz7bzdikkvxb6523gte0doodd.lambda-url.us-east-1.on.aws/",
			{
				method: "POST",
				body: JSON.stringify({

					id: current_id,
					restaurant_id: restaurant_id,
					user_id: user_id,
					feedback: feedback
				})
			})
			.then((res) => res.json()).then((res) => {
				if (res.status === 200) {
					alert("Error")
				}
				else {
					alert("Your feedback was sent")
					setSubmitted(true)
				}
			}, []);
	}
	// Showing success message
	const successMessage = () => {
		return (
			<div
				style={{
					display: submitted ? '' : 'none',
				}}>
				<h2>Thankyou for the feedback!</h2>
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

		<div className="form"
		>
			<div>
				<h1>Customer Feedback</h1>
				<br />
			</div>

			<div className="messages">
				{errorMessage()}
				{successMessage()}
			</div>

			<form>
				<label className="label">Your Name: </label>
				<input onChange={handleName} className="input"
					value={name} type="text" />
				<br />
				<br />
				<label className="label">Your Email: </label>
				<input onChange={handleUserEmail} className="input"
					value={userEmail} type="email" />
				<br />
				<br />
				<label className="label">Restaurant Email: </label>
				<input onChange={handleRestEmail} className="input"
					value={restEmail} type="email" />
				<br />
				<br />
				<label className="label">Feedback: </label>
				<input onChange={handleFeedback} className="input"
					value={feedBack} type="text" />
				<br />
				<br />
				<br />
				<button onClick={handleSubmit} className="btn" type="submit">
					Submit
				</button>
				<button className='btn' type='back'>
					<Link to="/">Back to Home</Link>
				</button>
			</form>
		</div>
	);
}

export { CustomerFeedback };
