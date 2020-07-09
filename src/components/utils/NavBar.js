import React from 'react';

const NavBar = () => {
	return (
		<div>
			<nav className='navbar navbar-light' style={{background: '#C08577'}}>
				<div className='container-fluid'>
					<a className='navbar-brand text-white font-weight-bold mx-auto mt-1' href='/'>
						<h3>Meridiano V</h3>					
					</a>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
