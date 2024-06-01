import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import {
	RiDashboardLine,
	RiFileList2Line,
	RiLogoutBoxRLine,
} from 'react-icons/ri';
import { FiUsers, FiSettings } from 'react-icons/fi';
import { GoBook } from 'react-icons/go';
import { CgProfile } from 'react-icons/cg';

import { signout } from '../../actions/auth.actions';

import './sidebar.scss';

const Sidebar = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signout());
  }

	return (
		<div className='sidebar'>
			<div className='top'>
				<Link to='/'>
					<span className='logo'>ledger</span>
				</Link>
			</div>
			<hr />
			<div className='middle'>
				<ul>
					<p className='title'>MAIN</p>
					<NavLink
						to='/'
						style={(isActive) => ({
							background: isActive ? '#7451f8' : '#fff',
						})}
					>
						<li>
							<RiDashboardLine className='icon' />
							<span>Dashboard</span>
						</li>
					</NavLink>
					<p className='title'>LISTS</p>
					<NavLink to='/ledger'>
						<li>
							<GoBook className='icon' />
							<span>Ledger</span>
						</li>
					</NavLink>
					<NavLink
						to='/users'
						style={(isActive) => ({
							background: isActive ? '#7451f8' : '#fff',
						})}
					>
						<li>
							<FiUsers className='icon' />
							<span>Users</span>
						</li>
					</NavLink>
					<NavLink to='/statement'>
						<li>
							<RiFileList2Line className='icon' />
							<span>Statement</span>
						</li>
					</NavLink>
					<p className='title'>USER</p>
					<NavLink to='/profile'>
						<li>
							<CgProfile className='icon' />
							<span>Profile</span>
						</li>
					</NavLink>
					<NavLink to='/settings'>
						<li>
							<FiSettings className='icon' />
							<span>Settings</span>
						</li>
					</NavLink>
					<li onClick={handleLogout}>
						<RiLogoutBoxRLine className='icon' />
						<span>Logout</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
