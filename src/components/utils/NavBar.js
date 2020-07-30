import React from 'react';

import mvLogo from '../../assets/img/mv.svg';

const NavBar = () => {
	return (
		<div className='barra'>
			<nav className='navbar'>
				<div className='container-fluid'>
					<a className='navbar-brand text-white font-weight-bold mx-auto mt-1' href='/'>
						<img src={mvLogo} alt='mv-logo' className='mv-logo' />					
					</a>
				
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
