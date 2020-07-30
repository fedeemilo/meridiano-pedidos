import React, { useState } from 'react';
import Empanadas from '../../assets/img/empanadas.jpg';
import Milanesas from '../../assets/img/milanesas.jpg';
import Pastas from '../../assets/img/pastas.jpg';
import Tortillas from '../../assets/img/tortillas.jpg';
import Papas from '../../assets/img/papas.jpg';
import Ensaladas from '../../assets/img/ensaladas.jpg';
import { ProductosGrid } from './';
import axios from 'axios';
import Fade from 'react-reveal/Fade';

const CategoriasGrid = () => {
	const [categ, setCateg] = useState('Menu Semanal');
	const [itemsPedido, setItemsPedido] = useState([]);
	const [pedidoActual, setPedidoActual] = useState({});
	const [idProducto, setIdProducto] = useState(0);

	// const serverLocal = '';
	const serverHeroku = 'https://meridiano-pedidos.herokuapp.com';

	let total = 0;

	// Se modifica el texto de la categoría al clickear en una opción de categoría
	const handleCategoria = (e) => {
		console.log(e.target);
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
	const handleRestItem = (id, nombreProducto) => {
		itemsPedido.forEach((pedido) => {
			if (Object.values(pedido).indexOf(nombreProducto) > -1) {
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
	const handleAddItem = async (nombreProducto) => {
		itemsPedido.forEach((item) => {
			if (Object.values(item).indexOf(nombreProducto) > -1) {
				console.log(item);
				let precioUnitario = item.precio / item.cantidad;
				item.cantidad += 1;
				item.precio += precioUnitario;
				let newArray = [...itemsPedido];
				setItemsPedido(newArray);
			}
		});
	};

	// Al seleccionar producto se agrega a la lista
	const handleSelectProducto = async (e, catego) => {
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

		let pedidoActualizado = await axios.put(
			`${serverHeroku}/pedidos/${pedidoActual._id}?nombre=${productoElegido}&categoria=${categoriaElegida}&precio=${precioProducto}`
		);

		setPedidoActual(Object.assign(pedidoActual, pedidoActualizado.data));

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

			// setItemsPedido((itemsPedido) => itemsPedido.concat(prodEdit));
			itemsPedido.forEach((item) => {
				if (`id${item.id}` === e.target.id) {
					item.producto = newText;
					setItemsPedido(itemsPedido);
				}
			});
		}
	};

	const handlePrint = () => {
		let newWindow = window.open('');
		let tablaAImprimir = document.querySelector('#pedidoAImprimir');
		// create style element
		const style = newWindow.document.createElement('style');

		style.innerHTML = `
			* {
				font-size: 12px;
				font-family: Times New Roman;
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
				width: 95px;
				max-width: 95px;
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
				width: 195px;
				max-width: 195px;
			}
		`;
		newWindow.document.write(tablaAImprimir.outerHTML);
		newWindow.document.head.appendChild(style);
		newWindow.print();
		newWindow.close();
	};

	const handleNuevoPedido = async (e) => {
		e.preventDefault();
		let containerCategorias = document.querySelector('.container-categorias');
		let containerProductos = document.querySelector('.container-productos');
		let btnNuevoPedido = document.querySelector('.btn-nuevo-pedido');
		let btnBorrarPedido = document.querySelector('.btn-borrar-pedido');
		let btnGuardarPedido = document.querySelector('.btn-guardar-pedido');
		let btnGuardadoAutomatico = document.querySelector(
			'.btn-guardado-automatico'
		);
		let overlay = document.querySelector('.overlay');
		let footerBar = document.querySelector('.footer-bar');

		footerBar.classList.add('d-none')
		containerCategorias.classList.remove('d-none');
		containerProductos.classList.remove('d-none');
		overlay.classList.remove('d-block');
		overlay.classList.add('d-none');
		btnBorrarPedido.classList.remove('disabled');
		btnNuevoPedido.classList.add('disabled');
		btnGuardarPedido.classList.remove('disabled');
		btnGuardadoAutomatico.classList.remove('disabled');
		btnBorrarPedido.classList.remove('disabled');

		let pedidoNuevo = await axios.post(`${serverHeroku}/pedidos`, { precioTotal: 0 });
		setPedidoActual(pedidoNuevo.data);
	};

	const handleBorrarPedido = (e) => {
		e.preventDefault();
		let containerCategorias = document.querySelector('.container-categorias');
		let containerProductos = document.querySelector('.container-productos');
		let btnNuevoPedido = document.querySelector('.btn-nuevo-pedido');
		let btnBorrarPedido = document.querySelector('.btn-borrar-pedido');
		let btnGuardarPedido = document.querySelector('.btn-guardar-pedido');
		let btnGuardadoAutomatico = document.querySelector(
			'.btn-guardado-automatico'
		);
		let alertaBorrado = document.querySelector('.pedido-borrado');
		let overlay = document.querySelector('.overlay');
		let footerBar = document.querySelector('.footer-bar');

		footerBar.classList.remove('d-none')
		overlay.classList.add('d-block');
		overlay.classList.remove('d-none');
		containerCategorias.classList.add('d-none');
		containerProductos.classList.add('d-none');
		btnBorrarPedido.classList.add('disabled');
		btnNuevoPedido.classList.remove('disabled');
		alertaBorrado.classList.remove('d-none');
		btnGuardarPedido.classList.add('disabled');
		btnGuardadoAutomatico.classList.add('disabled');

		axios.delete(`${serverHeroku}/pedidos/${pedidoActual._id}`);

		setTimeout(() => {
			alertaBorrado.classList.add('d-none');
		}, 2500);
	};

	const handleGuardarPedido = (e) => {
		console.log(itemsPedido);
		console.log(pedidoActual);

		pedidoActual.productos.forEach((producto, i) => {
			producto = Object.assign(producto, itemsPedido[i]);
		});

		pedidoActual.precioTotal = total;

		console.log(pedidoActual);
	};

	const handleGuardadoAutomatico = (e) => {};

	return (
		<div className='container-general-categorias'>
			<div className='d-flex justify-content-start'>
				{/* Opciones */}
				<div className='btn-group mt-3'>
					<button
						type='button'
						className='btn btn-primary'
						style={{ background: '#010042', border: '.5px solid #010042' }}
					>
						Opciones
					</button>
					<button
						type='button'
						className='btn btn-primary dropdown-toggle dropdown-toggle-split'
						data-toggle='dropdown'
						aria-expanded='false'
						style={{ background: '#010042', border: '.5px solid #010042' }}
					>
						<span className='sr-only'>Toggle Dropdown</span>
					</button>
					<ul className='dropdown-menu'>
						<li>
							<button
								className='dropdown-item btn-nuevo-pedido'
								onClick={(e) => handleNuevoPedido(e)}
							>
								Nuevo Pedido
							</button>
						</li>
						<li>
							<button
								className='dropdown-item btn-borrar-pedido disabled'
								onClick={(e) => handleBorrarPedido(e)}
							>
								Borrar Pedido Actual
							</button>
						</li>
						<li>
							<button
								className='dropdown-item btn-guardar-pedido disabled'
								onClick={(e) => handleGuardarPedido(e)}
							>
								Guardar Pedido
							</button>
						</li>
						<li>
							<button
								className='dropdown-item btn-guardado-automatico disabled'
								onClick={(e) => handleGuardadoAutomatico(e)}
							>
								Guardado Automático
							</button>
						</li>
					</ul>
				</div>
				{/* Alerta pedido borrado */}
			</div>
			<div
				className='alert alert-danger mt-3 w-25 d-none pedido-borrado position-absolute'
				role='alert'
			>
				Pedido borrado con éxito!
			</div>
			<div className='overlay'></div>

			<Fade>
				<div className='mt-5 container-categorias row d-none'>
					<div className='col-lg-5 grilla-categorias'>
						<span
							onClick={handleMenu}
							className='ms float-right bg-warning p-1 rounded'
						>
							Menú
						</span>
						<h2 className='mb-4'>Categorías de Productos </h2>
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
									<p
										id={item.id}
										key={item.id}
										className='ml-5 mt-3 item-productos'
									>
										<span className='text-info text-capitalize text-categoria'>
											{item.categoria} -{' '}
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
											onClick={() => handleAddItem(item.producto)}
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
			</Fade>
			{/* Productos por Categoría */}
			<div className='row container-productos d-none'>
				<div className='col-lg-12'>
					<ProductosGrid
						categoria={categ}
						selectProducto={handleSelectProducto}
					/>
				</div>
			</div>
		</div>
	);
};

export default CategoriasGrid;
