import React, { useState } from 'react';
import Empanadas from '../../assets/img/empanadas.jpg';
import Milanesas from '../../assets/img/milanesas.jpg';
import Pastas from '../../assets/img/pastas.jpg';
import Tortillas from '../../assets/img/tortillas.jpg';
import Papas from '../../assets/img/papas.jpg';
import Ensaladas from '../../assets/img/ensaladas.jpg';
import { ProductosGrid } from './';

const ResumenPedido = React.forwardRef((props) => (
	<div className='ticket'>
		<table
			id='pedidoAImprimir'
			className='table table-warning table-striped table-responsive text-center'
			style={{ marginTop: '8rem' }}
		>
			<thead>
				<tr className='table-warning'>
					<th className='categoria'>Categoría</th>
					<th className='producto'>Producto</th>
					<th className='cantidad'>Cantidad</th>
					<th className='precio'>Precio</th>
					<th className='total'>Total</th>
				</tr>
			</thead>
			<tbody>
				{props.items.map((item) => (
					<tr>
						<td className='categoria'>{item.categoria}</td>
						<td className='producto'>{item.producto}</td>
						<td className='cantidad'>{item.cantidad}</td>
						<td className='precio'>{item.precio}</td>
						<td>-------------</td>
					</tr>
				))}
				<tr className='text-center'>
					<td>-------------</td>
					<td>-------------</td>
					<td>-------------</td>
					<td>-------------</td>
					<td className='text-danger'>${props.tot}</td>
				</tr>
			</tbody>
		</table>
	</div>
));

const CategoriasGrid = () => {
	const [categ, setCateg] = useState('Menú Semanal');
	const [itemsPedido, setItemsPedido] = useState([]);
	const [idProducto, setIdProducto] = useState(0);
	let total = 0;

	// Se modifica el texto de la categoría al clickear en una opción de categoría
	const handleCategoria = (e) => {
		setCateg(e.target.alt);
	};

	// Al seleccionar 'Menú' se despliegan las opciones de menú
	const handleMenu = () => {
		setCateg('Menú Semanal');
	};

	// Ícono tacho basura para eliminar producto y actualizar el total
	const handleDeleteItem = (id) => {
		setItemsPedido((itemsPedido) =>
			itemsPedido.filter((obj) => {
				return obj.id !== id;
			})
		);
	};

	// Ícono restar(-) para restar un producto y actualizar el total
	const handleRestItem = (id) => {
		console.log(id);

		itemsPedido.forEach((pedido) => {
			if (Object.values(pedido).indexOf(id) > -1) {
				let prod = document.getElementById(`${id}`);
				if (pedido.cantidad === 1) {
					prod.style.display = 'none';
				}

				let precioUnitario = pedido.precio / pedido.cantidad;
				pedido.cantidad -= 1;
				pedido.precio -= precioUnitario;
				let newArray = [...itemsPedido];
				setItemsPedido(newArray);
			}
		});
	};

	// Ícono sumar(+) para agregar un producto y actualizar el total
	const handleAddItem = (id, producto) => {
		itemsPedido.forEach((pedido) => {
			if (Object.values(pedido).indexOf(id) > -1) {
				console.log(pedido);
				let precioUnitario = pedido.precio / pedido.cantidad;
				pedido.cantidad += 1;
				pedido.precio += precioUnitario;
				let newArray = [...itemsPedido];
				setItemsPedido(newArray);
			}
		});
	};

	// Al seleccionar producto se agrega a la lista
	const handleSelectProducto = (e, catego) => {
		let categoriaElegida = catego;
		let productoElegido = e.currentTarget.textContent.split('$')[0];
		let precioProducto = e.currentTarget.textContent.split('$')[1];
		let repetido = false;

		itemsPedido.forEach((pedido) => {
			let prod = document.getElementById(`${pedido.id}`);

			if (pedido.categoria === 'ensaladas') {
				return;
			}

			if (Object.values(pedido).indexOf(productoElegido) > -1) {
				pedido.cantidad += 1;
				pedido.precio += Number(precioProducto);

				let newArray = [...itemsPedido];
				setItemsPedido(newArray);
				repetido = true;
				if (pedido.cantidad > 0) {
					prod.style.display = 'block';
				}
				return;
			}
		});

		if (repetido) {
			return;
		}

		let armandoPedido = {
			id: idProducto,
			categoria: categoriaElegida,
			producto: productoElegido,
			precio: Number(precioProducto),
			cantidad: 1,
		};

		setIdProducto((idProducto) => idProducto + 2 * Math.random().toFixed(2));

		setItemsPedido((itemsPedido) => itemsPedido.concat(armandoPedido));
	};

	// Editar producto al hacer click en el texto del producto
	const handleEditProduct = (e) => {
		let prodEdit = document.getElementById(e.target.id);
		let text = prodEdit.textContent;

		let newText = prompt('Editar', text);

		if (newText !== null) {
			prodEdit.textContent = newText;
		}
		console.log(prodEdit.textContent);
	};

	const handlePrint = () => {
		let newWindow = window.open('');
		let tablaAImprimir = document.querySelector('#pedidoAImprimir');
		// create style element
		const style = newWindow.document.createElement('style');

		style.innerHTML = `
			* {
				font-size: 12px;
				font-family: 'Times New Roman';
			}

			thead {
				display: table-header-group;
			}

			tbody {
				display: table-row-group;
			}

			table, th, td, tr {
				color: black;
				background-color: lightgrey;
				border: 1px solid black;
				border-collapse: collapse;
			}

			td.producto,
			th.producto {
				width: 75px;
				max-width: 75px;
			}

			td.cantidad,
			th.cantidad {
				width: 40px;
				max-width: 40px;
				word-break: break-all;
			}

			td.precio,
			th.precio {
				width: 40px;
				max-width: 40px;
				word-break: break-all;
			}

			.ticket {
				width: 155px;
				max-width: 155px;
			}
		`;
		newWindow.document.write(tablaAImprimir.outerHTML);
		newWindow.document.head.appendChild(style);
		newWindow.print();
		newWindow.close();
	};

	return (
		<div className='container-general-categorias'>
			<div className='mt-5 container-categorias row'>
				<div className='col-lg-5'>
					<span
						onClick={handleMenu}
						className='ms float-right bg-warning p-1 rounded'
					>
						Menú
					</span>
					<h2 className='mb-3'>Categorías de Productos </h2>
					<div className='row'>
						<div className='col-12 col-lg-4 col-md-6'>
							{/* Categoría - Empanadas */}
							<div className='link-categ' onClick={(e) => handleCategoria(e)}>
								<div className='card' style={{ width: '11rem' }}>
									<img
										src={Empanadas}
										className='card-img-top img-categ'
										alt='empanadas'
									/>
									<div className='card-body'>
										<p className='card-text'>Empanadas</p>
									</div>
								</div>
							</div>
						</div>
						<div className='col-12 col-lg-4 col-md-6'>
							{/* Categoría - Milanesas */}
							<div className='link-categ' onClick={(e) => handleCategoria(e)}>
								<div className='card' style={{ width: '11rem' }}>
									<img
										src={Milanesas}
										className='card-img-top img-categ'
										alt='milanesas'
									/>
									<div className='card-body'>
										<p className='card-text'>Milanesas</p>
									</div>
								</div>
							</div>
						</div>
						<div className='col-12 col-lg-4 col-md-6'>
							{/* Categoría - Pastas */}
							<div className='link-categ' onClick={(e) => handleCategoria(e)}>
								<div className='card' style={{ width: '11rem' }}>
									<img
										src={Pastas}
										className='card-img-top img-categ'
										alt='pastas'
									/>
									<div className='card-body'>
										<p className='card-text'>Pastas</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='row mt-4'>
						<div className='col-12 col-lg-4 col-md-6'>
							{/* Categoría - Tortillas */}
							<div className='link-categ' onClick={(e) => handleCategoria(e)}>
								<div className='card' style={{ width: '11rem' }}>
									<img
										src={Tortillas}
										className='card-img-top img-categ'
										alt='tortillas'
									/>
									<div className='card-body'>
										<p className='card-text'>Tortillas</p>
									</div>
								</div>
							</div>
						</div>
						<div className='col-12 col-lg-4 col-md-6'>
							{/* Categoría - Papas */}
							<div className='link-categ' onClick={(e) => handleCategoria(e)}>
								<div className='card' style={{ width: '11rem' }}>
									<img
										src={Papas}
										className='card-img-top img-categ'
										alt='papas'
									/>
									<div className='card-body'>
										<p className='card-text'>Papas</p>
									</div>
								</div>
							</div>
						</div>
						<div className='col-12 col-lg-4 col-md-6'>
							{/* Categoría - Ensaladas */}
							<div className='link-categ' onClick={(e) => handleCategoria(e)}>
								<div className='card' style={{ width: '11rem' }}>
									<img
										src={Ensaladas}
										className='card-img-top img-categ'
										alt='ensaladas'
									/>
									<div className='card-body'>
										<p className='card-text'>Ensaladas</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Resúmen del Pedido */}
				<div className='col-lg-7 col-md-12'>
					<div className='d-flex justify-content-between'>
						<h3 className='text-resumen'>Resumen del Pedido</h3>
						<button className='btn btn-primary' onClick={handlePrint}>
							Imprimir Pedido
						</button>
					</div>
					<div>
						{itemsPedido && itemsPedido.length > 0 ? (
							itemsPedido.map((item) => (
								<p id={item.id} className='ml-5 mt-3 item-productos'>
									<span className='text-info text-capitalize text-categoria'>
										{item.categoria ? item.categoria.split(' ')[0] : null} -{' '}
									</span>
									<span
										id={`id${item.id}`}
										className='item-producto'
										onClick={(e) => handleEditProduct(e)}
									>
										{item.producto}{' '}
									</span>
									<ion-icon
										name='trash'
										className='float-right'
										onClick={() => handleDeleteItem(item.id)}
									></ion-icon>
									<ion-icon
										name='remove'
										onClick={() => handleRestItem(item.id, item.producto)}
									></ion-icon>
									<ion-icon
										name='add'
										onClick={() => handleAddItem(item.id, item.producto)}
									></ion-icon>
									<span className='text-primary ml-3 float-right'>
										( {item.cantidad} )
									</span>
									<span className='text-success float-right'>
										${item.precio}
									</span>
									<span className='d-none'>
										{(total += Number(item.precio))}
									</span>
								</p>
							))
						) : (
							<p className='ml-5 text-danger'>No hay productos cargados</p>
						)}
						<p className='float-right '>
							Total = <span className='text-danger'>${total}</span>
						</p>
					</div>
				</div>
			</div>
			{/* Productos por Categoría */}
			<div className='row container-productos'>
				<div className='col-lg-12'>
					<ProductosGrid
						categoria={categ}
						selectProducto={handleSelectProducto}
					/>
				</div>
			</div>

			{/* Tabla de pedido (oculta) */}
			<ResumenPedido items={itemsPedido} tot={total} />
		</div>
	);
};

export default CategoriasGrid;
