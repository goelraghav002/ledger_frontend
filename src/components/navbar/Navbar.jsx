import React, { useState } from 'react';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { IoLanguageSharp } from 'react-icons/io5';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { BiExitFullscreen } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import './navbar.scss';
import ProfileCard from './profileCard/ProfileCard';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { activeMenu } = useSelector((state) => state.activeMenu);

	const setActiveMenu = () => {
		dispatch({
			type: 'setActiveMenu',
		});
	};

	const darkMode = false;
	const [isClicked, setIsClicked] = useState(false);

	return (
		<>
			<div className='navbar'>
				<div className='wrapper'>
					{auth.authenticate ? (
						<div className='left'>
							{activeMenu ? (
								<button type='button' onClick={setActiveMenu}>
									<AiOutlineMenuFold className='icon' />
								</button>
							) : (
								<button
									type='button'
									onClick={() =>
										setActiveMenu((prevActiveMenu) => !prevActiveMenu)
									}
								>
									<AiOutlineMenuUnfold className='icon' />
								</button>
							)}
							{/* <div className='search'>
								<input type='text' placeholder='Search...' />
							</div> */}
						</div>
					) : (
						<Link to='/'>
							<span className='logo'>ledger</span>
						</Link>
					)}
					<div className='right'>
						<div className='icons'>
							<div className='item'>
								<IoLanguageSharp className='icon' />
								<select name='languages' id='language'>
									<option value='english'>English</option>
									<option value='hindi' disabled>
										हिन्दी
									</option>
									<option value='hinglish' disabled>
										Hinglish
									</option>
								</select>
							</div>
							<div className='item'>
								{darkMode ? (
									<MdOutlineLightMode className='icon' />
								) : (
									<MdOutlineDarkMode className='icon' />
								)}
							</div>
							<div className='item'>
								<BiExitFullscreen className='icon' />
							</div>
						</div>
						<div className='profile'>
							{!auth.authenticate ? (
								<>
									<div className='item'>
										<Link to='/signin'>
											<button type='button'>Login</button>
										</Link>
									</div>
									<div className='item'>
										<Link to='/signup'>
											<button type='button'>Register</button>
										</Link>
									</div>
								</>
							) : (
								<div className='item'>
									<img
										src='user.jfif'
										alt='user'
										onClick={() =>
											setIsClicked((prevIsClicked) => !prevIsClicked)
										}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
				{isClicked && (
					<ProfileCard isClicked={isClicked} setIsClicked={setIsClicked} />
				)}
			</div>
		</>
	);
};

export default Navbar;
