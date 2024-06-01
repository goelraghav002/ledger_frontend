import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './users.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { getAdminUsers } from '../../helpers/apiRequest';
import SearchBar from '../../components/searchbar/SearchBar';

const Users = () => {
	const { activeMenu } = useSelector((state) => state.activeMenu);

	const [users, setUsers] = useState();
	const [inputValue, setInputValue] = useState('');

	const handleSearch = () => {
		return users.filter(
			(user) =>
				user.name.toLowerCase().includes(inputValue) ||
				user.username.toLowerCase().includes(inputValue) ||
				user.email.toLowerCase().includes(inputValue) ||
				user.contactNumber.toString().includes(inputValue)
		);
	};

	useEffect(() => {
		getAdminUsers().then((data) => setUsers(data.users));
	}, []);

	return (
		<div className='users'>
			{activeMenu && <Sidebar />}
			<div className='usersContainer'>
				<Navbar />
				<div>
					<div style={{ width: '50%', margin: 'auto' }}>
						<SearchBar
							inputValue={inputValue}
							setInputValue={setInputValue}
							placeholder={`Users`}
						/>
					</div>
					<div className='userContainer'>
						{users &&
							handleSearch().map((users) => (
								<div className='user' key={users._id}>
									<h1>{users.name}</h1>
									<p>{users.username}</p>
									<p>{users.email}</p>
									<p>{users.contactNumber}</p>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Users;
