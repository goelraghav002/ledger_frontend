import React, { useEffect, useState } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import Navbar from '../../components/navbar/Navbar';
import SearchBar from '../../components/searchbar/SearchBar';
import Sidebar from '../../components/sidebar/Sidebar';
import Customer from '../../components/customer/Customer';
import {
	getAdminCustomers,
	getCustomerTransactions,
} from '../../helpers/apiRequest';
import AddCustomer from '../../components/addCustomer/AddCustomer';
import AddTransaction from '../../components/addTransaction/AddTransaction';

import './ledger.scss';
import Transactions from '../../components/transactions/Transactions';
import TransactionFooter from '../../components/transactions/TransactionFooter';

const Ledger = () => {
	const { activeMenu } = useSelector((state) => state.activeMenu);
	const [addCustomerBtn, setAddCustomerBtn] = useState(false);
	const [addTransaction, setAddTransaction] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [customers, setCustomers] = useState();
	const [customer, setCustomer] = useState(null);
	const [transactions, setTransactions] = useState();
	const [clicked, setClicked] = useState(false);
	const [transactionType, setTransactionType] = useState();

	const handleSearch = () => {
		return customers?.filter(
			(customer) =>
				customer.name.toLowerCase().includes(inputValue) ||
				customer.username.toLowerCase().includes(inputValue) ||
				customer.email.toLowerCase().includes(inputValue) ||
				customer.contactNumber.toString().includes(inputValue)
		);
	};

	const handleTransactionType = (tType) => {
		setAddTransaction(true);
		setTransactionType(tType);
	};

	const handleCustomerClick = (id) => {
		setClicked(true);
		getCustomerTransactions(id).then((data) =>
			setTransactions(data.transactions)
		);
		getCustomerTransactions(id).then((data) => setCustomer(data));
	};

	useEffect(() => {
		getAdminCustomers().then((data) => setCustomers(data.customers));
	}, [addCustomerBtn, addTransaction]);

	return (
		<div className='ledger'>
			{activeMenu && <Sidebar />}
			<div className='ledgerPage'>
				<Navbar />
				<div className='ledgerContainer'>
					<div className='customersContainer'>
						<SearchBar
							inputValue={inputValue}
							setInputValue={setInputValue}
							placeholder='Customers'
						/>
						<hr />
						{customers?.length !== 0 ? (
							handleSearch()?.map((customers) => (
								<div
									key={customers._id}
									onClick={() => handleCustomerClick(customers._id)}
								>
									<Customer
										cname={customers.name}
										balance={customers.balance}
									/>
								</div>
							))
						) : (
							<div className='empty'>No customers</div>
						)}

						<div className='addCustomerBtn'>
							<button type='button' onClick={() => setAddCustomerBtn(true)}>
								<FiUserPlus />
								&nbsp;Add Customer
							</button>
						</div>
					</div>
					<div className='customerTransaction'>
						{clicked ? (
							transactions !== 0 ? (
								<div>
									<div className='customerBar'>
										<div className='customerDetails'>
											<h3>{customer?.name}</h3>
										</div>
										<div className=''>Links</div>
									</div>
									<Transactions transactions={transactions} />
									<TransactionFooter customer={customer} handleTransactionType={handleTransactionType} />
								</div>
							) : (
								'No transactions'
							)
						) : (
							'Click on customer to show transactions'
						)}
					</div>
				</div>
			</div>
			{addCustomerBtn && <AddCustomer setAddCustomerBtn={setAddCustomerBtn} />}
			{addTransaction && (
				<AddTransaction
					customer={customer._id}
					customerName={customer.name}
					transactionType={transactionType}
					setAddTransaction={setAddTransaction}
					handleCustomerClick={handleCustomerClick}
				/>
			)}
		</div>
	);
};

export default Ledger;
