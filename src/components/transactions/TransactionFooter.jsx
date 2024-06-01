import React from 'react';

const TransactionFooter = ({ customer, handleTransactionType }) => {
	return (
		<div className='transactionFooter'>
			<div className='balanceInfo'>
				<p>Balance{customer?.balance <= 0 ? ' Advance' : ' Due'}</p>
				<h2 className={customer?.balance <= 0 ? 'advance' : 'due'}>
					₹ {customer?.balance < 0 ? -1 * customer?.balance : customer?.balance}
				</h2>
			</div>
			<div className='transactionButtons'>
				<button
					type='button'
					className='transactionButton payment'
					onClick={() => handleTransactionType('payment')}
				>
					Payment
				</button>
				<button
					type='button'
					className='transactionButton credit'
					onClick={() => handleTransactionType('credit')}
				>
					Credit
				</button>
			</div>
		</div>
	);
};

export default TransactionFooter;
