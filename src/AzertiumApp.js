import React, { useEffect, useState } from 'react';
import { FrameworkTable } from './components/FrameworkTable';
import { apiRequest } from './helper/apiRequest';
import { useForm } from './hooks/useForm';

export const AzertiumApp = () => {
	//useState para recibir la lista de frameworks provenientes de apiRequest
	const [frameworkList, setframeworkList] = useState([]);

	//se colocarán unas frases en la interfaz de usuario.
	const initialMessage = 'Escriba el nombre del Framework que está buscando';

	//se colocarán unas frases en la interfaz de usuario.
	const [mensaje, setmensaje] = useState(initialMessage);

	//se usará una variable para evitar consultas duplicadas
	const [textForSend, settextForSend] = useState('');

	// inicialización del useState del input del formulario
	const initialState = {
		searchText: '',
	};

	/* se utiliza un custome Hook para el control del input del formulario.  */
	const [formValues, handleInputChange] = useForm(initialState);

	/* desestructuración para poder colocar en el value del input */
	const { searchText } = formValues;

	/* accion que maneja el evento submit del formulario */
	const handleBuscador = (e) => {
		e.preventDefault(); //evita el comportamiento por defecto del submit de formulario

		//si el input de texto esta vacio o si se está repitiendo la misma consulta sale de la funcion para no disparar una peticion fetch innecesaria
		if (searchText.trim() === '' || textForSend === searchText) {
			return;
		}

		settextForSend(searchText); // Se intruce

		//control de la UI con un mensaje de espera
		setmensaje(
			<>
				<div className='spinner-grow text-primary' role='status'>
					{' '}
				</div>
				<span>Espere...</span>
			</>
		);

		apiRequest(textForSend)
			.then((data) => {
				//manejo de la petición asincrona

				setframeworkList(data.items); // Ingresa el valor a las props que se pasaran al componente FrameworkTable
				setmensaje('Resultados de la busqueda'); // Manejo de la UI quitando el mensaje de espera
				if (data.items.length === 0) {
					setmensaje('No se ha encontrado ningún Framework con ese nombre');
				} // Manejo de la UI
			})
			.catch((err) => {
				console.log(err);
				setmensaje(
					'El servidor no responde correctamente, por favor inténtelo más tarde'
				); // Manejo de la UI indicando que hubo falla en la petición al servidor
			});
	};

	useEffect(() => {
		// Manejo de la UI cuando el cuadro de dialogo está vacío aparece el mensaje inicial

		if (searchText.trim() === '') {
			setmensaje(initialMessage);
		}
	}, [searchText]);

	return (
		<div className='container-fluid'>
			<div className='header__container'>
				<form onSubmit={handleBuscador}>
					<input
						type='text'
						placeholder='Framework'
						className='form-control'
						name='searchText'
						autoComplete='off'
						onChange={handleInputChange}
						value={searchText}
					/>
					<i className='bi bi-search'></i>
				</form>

				<span className='header__messages'>{mensaje}</span>
			</div>

			<table className='table'>
				<thead>
					<tr>
						<th className='table__namefield'>Nombre de repositorio</th>
						<th>URL</th>
					</tr>
				</thead>
				<tbody>
					<FrameworkTable frameworkList={frameworkList} />
				</tbody>
			</table>
		</div>
	);
};
