import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoCloseSharp } from 'react-icons/io5';
import axios from '../../helpers/axios';

import './addTransaction.scss';

const AddTransaction = ({ transactionType, setAddTransaction, customer, customerName, handleCustomerClick }) => {
	const [amount, setAmount] = useState('');
	const [note, setNote] = useState('');
	const [error, setError] = useState(null);
	// console.log(customer._id);

    const addTransaction = async () => {
		const id = localStorage.getItem('_id');
		const res = await axios
			.post(`/transaction/${customer}/add`, {
				amount: Number(amount),
				note,
				transactionType,
				admin: id,
				customerName,
			})
			.catch((err) => setError(err));
			if (res?.status === 201) {
			const data = await res.data;
			setAddTransaction(false);
            handleCustomerClick(customer);
			return data;
        } else {
            console.log(error);
			return error;
		}
	};

	const handleAddTransaction = (e) => {
        e.preventDefault();
        addTransaction().then(data => (data?.status === 400 ? toast.error(data.data?.message) : toast.success(data?.message)));
	};

	return (
		<div className='addTransaction'>
			<div className='container'>
				<div className='header'>
					<h3>Add {transactionType === 'payment' ? 'Payment' : 'Credit'}</h3>
					<IoCloseSharp
						className='icon'
						onClick={() => setAddTransaction(false)}
					/>
				</div>
				<div className='formContainer'>
					<form onSubmit={handleAddTransaction}>
						<span className={`amount ${transactionType}`}>
							₹{' '}
							<input
								type='number'
								placeholder='Amount'
                                required
								min={0}
								max={999999}
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								className={`${transactionType}`}
							/>
						</span>
						<div className='notes'>
							<label htmlFor='note'>Notes</label>
							<textarea
								name='note'
								id='note'
								cols='30'
								rows='5'
								value={note}
								onChange={(e) => setNote(e.target.value)}
								placeholder='Eg. Bill Number, Item details, etc'
							></textarea>
						</div>
						<button type='submit' className='submitBtn'>
							Done
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddTransaction;
