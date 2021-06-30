import React from 'react';

export const FrameworkTable = ({ frameworkList }) => {
	/* Recibe por props el array de la lista de frameworks y hace un map, utiliza el id como 
    key para que sea único, y coloca los atributos de nombre y url en las filas correspondientes de la tabla*/
	return (
		<>
			{frameworkList.map((list) => (
				<tr key={list.id}>
					<td className='table__namefield'>{list.name}</td>
					<td>{list.url}</td>
				</tr>
			))}
		</>
	);
};
