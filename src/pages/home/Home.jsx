import React from 'react';
import { useSelector } from 'react-redux';


import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

import './home.scss';

const Home = () => {
	const { activeMenu } = useSelector(state => state.activeMenu);

	return (
		<div className='home'>
			{activeMenu && <Sidebar />}
			<div className='homeContainer'>
				<Navbar />
				<div>
					Page under development. Please navigate to ledger.
				</div>
			</div>
		</div>
	);
};

export default Home;
