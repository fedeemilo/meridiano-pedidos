import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductosGrid = ({ categoria, selectProducto }) => {
	const [productos, setProductos] = useState([]);

	useEffect(() => {
		const fetchProductos = async () => {
			let res = await axios.get('/productos');
			setProductos((productos) => productos.concat(res.data));
		};

		fetchProductos();
	}, []);

	const filtrarProductos = () => {
		if (categoria === 'Menú Semanal' || categoria === 'Menu Semanal') {
			categoria = 'menu semanal';
		}
		try {
			return productos.filter(
				(producto) => producto.categoria.toLowerCase() === categoria
			);
		} catch (error) {
			console.log(error);
			return [];
		}
	};

	const categoriaFiltrada = filtrarProductos();

	return (
		<div className='row mt-5 container-productos'>
			<div className='col-lg-12 col-sm-12'>
				<h3 className='text-capitalize'>{categoria}</h3>
				<ul className=' list-group list-group-horizontal-xl'>
					{categoriaFiltrada.map((prod, idx) => (
				
							<button
								className='btn product-button list-group-item list-group-item-action list-group-item-primary mr-2 font-weight-bold d-flex align-items-center flex-column'
								key={idx}
								onClick={(e) => selectProducto(e, categoria)}
							>
								{prod.nombre}
								<span className='badge bg-primary rounded-pill'>
									${prod.precio}
								</span>
							</button>
					
					))}
				</ul>
			</div>
		</div>
	);
};

export default ProductosGrid;
