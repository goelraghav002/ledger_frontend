import React from 'react';

import './searchBar.scss';

const SearchBar = ({inputValue, setInputValue, placeholder}) => {
	return (
		<div className='searchContainer'>
			<div className='search'>
				<input
					type='text'
					placeholder={`Search ${placeholder}`}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
			</div>
			{/* <hr /> */}
		</div>
	);
};

export default SearchBar;
