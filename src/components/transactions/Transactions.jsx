import React from 'react';
import { showDate } from '../../helpers/common-functions';

import './transactions.scss';

const Transactions = ({ transactions }) => {
	return (
		<div className='transactionContainer'>
			{transactions?.length !== 0 &&
				transactions?.map((transactions) => (
					<div
						className={`itemContainer ${transactions.transactionType}`}
						key={transactions._id}
					>
						<div className='item'>
							<div className='transactionDetails'>
								<p className={transactions.transactionType}>
									₹{' '}
									{transactions.amount < 0
										? -1 * transactions.amount
										: transactions.amount}
								</p>
								<p className='transactionDate'>
									{showDate(transactions.created_at)}
								</p>
							</div>
							{transactions.note !== '' ? (
								<p className='note'><strong>Note:</strong> {transactions.note}</p>
							) : (
								null
							)}
						</div>
					</div>
				))}
		</div>
	);
};

export default Transactions;
