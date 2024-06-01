import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import axios from '../../helpers/axios';
import toast from 'react-hot-toast';

import './addCustomer.scss';

const AddCustomer = ({ setAddCustomerBtn }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [error, setError] = useState(null);

    const createCustomer = async () => {
        const id = localStorage.getItem('_id');
        const res = await axios.post('/customer/add', {
            name,
            username,
            contactNumber,
            email,
            password,
            admin: id
        }).catch((err) => setError(err.response));
        if (res?.status === 201) {
            const data = await res.data;
            setAddCustomerBtn(false);
            return data;
        } else {
            return error;
        }
    }
    
	const handleCreateCustomer = (e) => {
        e.preventDefault();
        createCustomer().then(data => ( data?.status === 400 ? toast.error(data.data.message) : toast.success(data.message)));
    };

	return (
		<div className='addCustomer'>
			<div className='container'>
				<div className='header'>
					<h3>Add a New Customer</h3>
					<IoCloseSharp
						className='icon'
						onClick={() => setAddCustomerBtn(false)}
					/>
				</div>
				<div className='formContainer'>
					<form onSubmit={handleCreateCustomer}>
						<input
							required
							type='text'
							autoComplete='false'
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder='Name'
						/>
						<input
							required
							type='text'
							autoComplete='false'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder='UserName'
						/>
						<input
							required
							type='number'
							autoComplete='false'
							value={contactNumber}
							onChange={(e) => setContactNumber(e.target.value)}
							placeholder='Mobile Number'
						/>

						<input
							required
							type='email'
							autoComplete='false'
							value={email}
							placeholder='Email'
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							required
							type='password'
							autoComplete='false'
							value={password}
							placeholder='Password'
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button type='submit' className='submitBtn'>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddCustomer;
