import React from 'react';
import { CategoriasGrid } from './';
import { NavBar } from '../utils';

const Main = () => {

	return (
		<div>
			<NavBar />
			<div className='container'>
				<div className='row'>
					<div className='col-12 col-lg-12'>
						{/* Categorías de productos */}
						<CategoriasGrid />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
