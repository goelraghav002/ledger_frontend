import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../../actions/auth.actions';

import './profileCard.scss';

const ProfileCard = ({ isClicked, setIsClicked }) => {
	
    const dispatch = useDispatch();

    const { name, email, contactNumber } = useSelector(
        (state) => state.auth.admin
    );
    
	const handleLogout = () => {
		dispatch(signout());
	};

	return (
		<div className='profileCard'>
			<div className='cardHeader'>
				<p>Admin Profile</p>
				<IoCloseSharp
					className='icon'
					onClick={() => setIsClicked(!isClicked)}
				/>
			</div>
			<div className='user'>
				<img src='user.jfif' alt='user' />
				<div>
					<h4>{name}</h4>
					<p>{email}</p>
					<p>{contactNumber}</p>
				</div>
			</div>
			<hr />
			<div className='links'>
				<ul>
					<li>Profile</li>
					<hr />
					<li>Notifications</li>
					<hr />
					<li>Settings</li>
					<hr />
					<button type='button' onClick={handleLogout}>Logout</button>
				</ul>
			</div>
		</div>
	);
};

export default ProfileCard;
