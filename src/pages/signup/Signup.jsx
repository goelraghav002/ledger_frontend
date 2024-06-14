import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './signup.scss';
import Navbar from '../../components/navbar/Navbar';
import { signup } from '../../actions/user.actions';
import toast from 'react-hot-toast';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
	const [contactNumber, setContactNumber] = useState('');

	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const user = useSelector((state) => state.user);

	const handleUserSignup = (e) => {
		e.preventDefault();

		const admin = {
			name,
			username,
			contactNumber,
			email,
			password,
		};

		dispatch(signup(admin));
		return <Navigate to={'/'} replace />
	};

	if (auth.authenticate) {
		return <Navigate to={`/`} replace />;
	}

	if (user.loading) {
		toast.success('Signup Successful!, Please login to continue...');
		return <Navigate to={`/signin`} replace />;
	}

	return (
		<div className='signup'>
			<Navbar />
			<div className='signupContainer'>
				<h1>Welcome to ledger, please Signup to continue...</h1>
			</div>
			<div className='formContainer'>
				<form onSubmit={handleUserSignup}>
					<input
						type='text'
						autoComplete='false'
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Name'
					/>
					<input
						type='text'
						autoComplete='false'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder='UserName'
					/>
					<input
						type='number'
						autoComplete='false'
						value={contactNumber}
						onChange={(e) => setContactNumber(e.target.value)}
						placeholder='Mobile Number'
					/>

					<input
						type='email'
						autoComplete='false'
						value={email}
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						autoComplete='false'
						value={password}
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type='submit' className='submitBtn'>
						Signin
					</button>
				</form>
			</div>
		</div>
	);
};

export default Signup;
