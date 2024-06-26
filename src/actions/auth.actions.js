import axios from '../helpers/axios';
import { authConstants } from './constants';

export const login = (user) => {

	return async (dispatch) => {
		dispatch({ type: authConstants.LOGIN_REQUEST });
		const res = await axios.post(`admin/signin`, {
			...user,
		});

		if (res.status === 200) {
			const { token, admin } = res.data;
			localStorage.setItem('token', token);
			localStorage.setItem('_id', admin._id)
			localStorage.setItem('admin', JSON.stringify(admin));
			dispatch({
				type: authConstants.LOGIN_SUCCESS,
				payload: {
					token,
					admin,
				},
			});
		} else {
			if (res.status === 400) {
				dispatch({
					type: authConstants.LOGIN_FAILURE,
					payload: { error: res.data.error },
				});
			}
		}
	};
};

export const isAdminLoggedIn = () => {
	return async (dispatch) => {
		const token = localStorage.getItem('token');
		if (token) {
			const admin = JSON.parse(localStorage.getItem('admin'));
			dispatch({
				type: authConstants.LOGIN_SUCCESS,
				payload: {
					token,
					admin,
				},
			});
		} else {
			dispatch({
				type: authConstants.LOGIN_FAILURE,
				payload: { error: 'Failed to Login' },
			});
		}
	};
};

export const signout = () => {
	return async (dispatch) => {
		dispatch({ type: authConstants.LOGOUT_REQUEST });
		const res = await axios.post('/admin/signout');

		if (res.status === 200) {
			localStorage.clear();
			dispatch({
				type: authConstants.LOGOUT_SUCCESS,
			});
		} else {
			dispatch({
				type: authConstants.LOGOUT_FAILURE,
				payload: { error: res.data.error },
			});
		}
	};
};
