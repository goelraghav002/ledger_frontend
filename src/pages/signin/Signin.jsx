import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Navbar from '../../components/navbar/Navbar';
import './signin.scss';
import { login } from '../../actions';

const Signin = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const [isSignupPage, setIsSignupPage] = useState(false);

	

	const userLogin = (e) => {
		e.preventDefault();

		const admin = {
			email,
			password,
		};

		dispatch(login(admin));
	};

	if (auth.authenticate) {
		return <Navigate to={`/`} replace />;
	}

	return (
		<div className='signin'>
			<Navbar />
			<div className='signinContainer'>
				<h1>Welcome to Logo, please Signin to continue...</h1>
			</div>
			<div className='formContainer'>
				<form onSubmit={userLogin}>
					{/* {isSignupPage && (
						<>
							<input type='text' placeholder='Name' />
							<input type='text' placeholder='UserName' />
							<input type='number' placeholder='Mobile Number' />
						</>
					)} */}
					<input
						type='email'
						autoComplete='false'
						value={email}
						placeholder='Email or raghav@gmail.com'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						autoComplete='false'
						value={password}
						placeholder='Password or 123456'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type='submit' className='submitBtn'>
						Signin
					</button>
					{/* <div className='link'>
						<span onClick={() => setIsSignupPage(!isSignupPage)}>
							{!isSignupPage
								? `New to Logo? Create an account`
								: `Existing User? Log in`}
						</span>
					</div> */}
				</form>
			</div>
		</div>
	);
};

export default Signin;
