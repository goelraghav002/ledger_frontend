import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { getAdminTransactions } from '../../helpers/apiRequest';
import { showDate } from '../../helpers/common-functions';

import './statement.scss';

const Statement = () => {
	const { activeMenu } = useSelector((state) => state.activeMenu);
	const [transactions, setTransactions] = useState();
	const [admin, setAdmin] = useState();
	// const [customer, setCustomer] = useState();

	const getTransactionCount = (tType) => {
		let count = 0;
		for (let i = 0; i < admin?.transactions?.length; i++) {
			if (admin.transactions[i].transactionType === tType) {
				count++;
			}
		}
		return count;
	};

	const getTransactionTotalAmount = (tType) => {
		let amount = 0;
		for (let i = 0; i < admin?.transactions?.length; i++) {
			if (admin.transactions[i].transactionType === tType) {
				amount += admin.transactions[i].amount;
			}
		}
		return amount;
	};

	useEffect(() => {
		getAdminTransactions().then((data) => setAdmin(data.admin));
		getAdminTransactions().then((data) =>
			setTransactions(data.admin.transactions)
		);
	}, []);

	return (
		<div className='statement'>
			{activeMenu && <Sidebar />}
			<div className='statementPage'>
				<Navbar />
				<div className='statementContainer'>
					<div className='header'>
						<h1>Account Statement</h1>
					</div>
					<div className='card'>
						<div
							className={`netBalance ${
								admin?.balance >= 0 ? 'pending' : 'advance'
							}`}
						>
							<span>Net Balance {admin?.balance >= 0 ? 'Due' : 'Advance'}</span>
							<h2>₹ {admin?.balance < 0 ? -1 * admin?.balance : admin?.balance}</h2>
						</div>
						<div className='right'>
							<div className='payments'>
								<span>{getTransactionCount('payment')} Payments</span>
								<h2>₹ {-1 * getTransactionTotalAmount('payment')}</h2>
							</div>
							<div className='vr'></div>
							<div className='credits'>
								<span>{getTransactionCount('credit')} Credits</span>
								<h2>₹ {getTransactionTotalAmount('credit')}</h2>
							</div>
						</div>
					</div>
					<div className='adminTransaction'>
						{transactions !== 0 ? (
							<div className='adminTransactionContainer'>
								{transactions?.length !== 0 &&
									transactions?.map((transactions) => (
										<div
											className={`itemContainer ${transactions.transactionType}`}
											key={transactions._id}
										>
											<div className='item'>
												<p className={transactions.transactionType}>
													₹{' '}
													{transactions.amount < 0
														? -1 * transactions.amount
														: transactions.amount}{' '}
													<span className='customerName'>&nbsp;({transactions.customerName})</span>
												</p>
												<p className='transactionDate'>
													{showDate(transactions.created_at)}
												</p>
											</div>
										</div>
									))}
							</div>
						) : (
							'No transactions'
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Statement;
