import React from 'react';

import './customer.scss';

const Customer = ({ cname, balance, classname }) => {
	return (
		<div>
			<div className='customer'>
				<h4 className='cname'>{cname}</h4>
				<p className={balance <= 0 ? 'advance' : 'due'}>
					₹{balance < 0 ? -1 * balance : balance}
				</p>
			</div>
			<hr />
		</div>
	);
};

export default Customer;
