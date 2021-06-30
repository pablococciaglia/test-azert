import react from 'react';
import { render, screen } from '@testing-library/react';
import { AzertiumApp } from './AzertiumApp';

describe('cuando FrameworkTable está montado', () => {
	it('debe mostrar un input con el placeholder que diga Framework', () => {
		render(<AzertiumApp />);

		expect(screen.getByPlaceholderText(/Framework/i)).toBeInTheDocument();
	});

	it('debe existir una tabla', () => {
		render(<AzertiumApp />);

		expect(screen.getByRole('table')).toBeInTheDocument();
	});
});
