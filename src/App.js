import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './app.scss';
import Ledger from './pages/ledger/Ledger';
import Home from './pages/home/Home';
import Users from './pages/users/Users';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isAdminLoggedIn } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import Statement from './pages/statement/Statement';

function App() {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		if (!auth.authenticate) {
			dispatch(isAdminLoggedIn());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Toaster />
			<Routes>
				<Route
					path='/'
					element={
						<PrivateRoute element={<Home />}>
							<Home />
						</PrivateRoute>
					}
				/>
				<Route
					path='/users'
					element={
						<PrivateRoute element={<Users />}>
							<Users />
						</PrivateRoute>
					}
				/>
				<Route
					path='/ledger'
					element={
						<PrivateRoute element={<Ledger />}>
							<Ledger />
						</PrivateRoute>
					}
				/>
				<Route
					path='/statement'
					element={
						<PrivateRoute element={<Statement />}>
							<Statement />
						</PrivateRoute>
					}
				/>
				<Route
					path='/profile'
					element={
						<PrivateRoute element={<Home />}>
							<Home />
						</PrivateRoute>
					}
				/>
				<Route
					path='/settings'
					element={
						<PrivateRoute element={<Home />}>
							<Home />
						</PrivateRoute>
					}
				/>
				<Route path='/signin' element={<Signin />} />
				<Route path='/signup' element={<Signup />} />
			</Routes>
		</div>
	);
}

export default App;
