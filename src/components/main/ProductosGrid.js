import React, { useState, useEffect } from 'react';

const ProductosGrid = ({ categoria, selectProducto }) => {
    const [categProp, setCategProp] = useState(0);

	useEffect(() => {
		switch (categoria) {
			case 'empanadas':
				setCategProp(0);
				break;
			case 'milanesas':
				setCategProp(1);
				break;
			case 'pastas':
				setCategProp(2);
				break;
			case 'tortillas':
				setCategProp(3);
				break;
			case 'papas':
				setCategProp(4);
				break;
			case 'ensaladas':
				setCategProp(5);
				break;
			default:
				setCategProp(6);
        }

	}, [categoria]);

	const categorias = [
		// 0: empanadas
		[
			{
				nombre: 'Jamón y Queso',
				precio: 40,
			},
			{
				nombre: 'Cortada a Cuchillo',
				precio: 40,
			},
			{
				nombre: 'Pollo',
				precio: 40,
			},
			{
				nombre: 'Verdura',
				precio: 40,
			},
			{
				nombre: '1/2 docena + 1',
				precio: 200,
			},
			{
				nombre: '1 docena + 3',
				precio: 360,
			},
		],
		// 1: milanesas
		[
			// Carne
			{
				nombre: 'Con Fritas (Carne)',
				precio: 320,

			},
			{
				nombre: 'Con Puré de Papas (Carne)',
				precio: 320,

			},
			{
				nombre: 'Napo con Fritas (Carne)',
				precio: 350,

			},
			{
				nombre: 'Napo con Pure (Carne)',
				precio: 350,

			},
			{
				nombre: 'Meridiano V (Carne)',
				precio: 370,
			},
			// Pollo
			{
				nombre: 'Con Fritas (Pollo)',
				precio: 320,

			},
			{
				nombre: 'Con Puré de Papas (Pollo)',
				precio: 320,

			},
			{
				nombre: 'Napo con Fritas (Pollo)',
				precio: 350,

			},
			{
				nombre: 'Napo con Pure (Pollo)',
				precio: 350,

			},
			{
				nombre: 'Meridiano V (Pollo)',
				precio: 370,
			},
		],
		// 2: pastas
		[
			{
				nombre: 'Ravioles de Verdura',
				precio: 300,
			},
			{
				nombre: 'Sorrentinos J y Q',
				precio: 300,
			},
			{
				nombre: 'Spaghetti',
				precio: 300,
			},
		],
		// 3: tortillas
		[
			{
				nombre: 'De papas',
				precio: 100,
			},
			{
				nombre: 'De acelga',
				precio: 150,
			},
		],
		// 4: papas
		[
			{
				nombre: 'Fritas solas',
				precio: 200,
			},
			{
				nombre: 'Fritas con Verdeo y Panceta',
				precio: 230,
			},
			{
				nombre: 'Fritas con cheddar y panceta',
				precio: 250,
			},
		],
		// 5: ensaladas
		[
			{
				nombre: 'Ensalada para armar',
				precio: 130
			},
		
			
		],
		// 6: delivery y menú
		[
			{
				nombre: 'Lunes - Pata Muslo',
				precio: 200,
			},
			{
				nombre: 'Martes - Pastel de Papas',
				precio: 200,
			},
			{
				nombre: 'Miércoles - Pescado',
				precio: 200,
			},
			{
				nombre: 'Jueves - Guiso de Lentejas',
				precio: 200,
			},
			{
				nombre: 'Viernes - Vacío al Horno c/Papas',
				precio: 200,
			},
		],
	];


	return (
		<div className='row mt-5 container-productos'>
			<div class="col-lg-6 col-sm-12">
				<h3 className='text-capitalize'>{categoria}</h3>
				<ul className='list list-group list-group-horizontal-lg '>
					{categorias[categProp].map((prod, idx) => (
						<button className='product-button' onClick={(e) => selectProducto(e, categoria)}>
							<li
								className='list-product list-group-item list-group-item-action list-group-item-secondary font-weight-bold d-flex justify-content-between align-items-center'
								key={idx}							
							>
								{prod.nombre}
							</li>
							<span class='badge bg-primary rounded-pill'>${prod.precio}</span>
						</button>
					))}
				</ul>
			</div>
			
		</div>
	);
};

export default ProductosGrid;
