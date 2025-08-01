import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { SliderModal } from '../features/administrador/slider-admin/components/SliderModal';
import type { SliderRequest } from '../features/administrador/slider-admin/services/slider.interface';

describe('ModalSlider', () => {
	const mockHandleModal = vi.fn();
	const mockCreateSlider = vi.fn();
	const mockUpdatedSlider = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		mockCreateSlider.mockResolvedValue(true);
		vi.stubGlobal('alert', vi.fn());
		render(
			<SliderModal
				handleModal={mockHandleModal}
				createSlider={mockCreateSlider}
				updatedSlider={mockUpdatedSlider}
				sliderEditable={null}
			/>
		);
	});
	// it('Se muestra el titulo del Modal', () => {
	// 	const h3 = screen.getByRole('heading', { level: 3 });
	// 	expect(h3).toBeInTheDocument();
	// 	expect(h3.textContent).toBe('Nuevo Slider');
	// });

	it('Crear nuevo slider', async () => {
		const user = userEvent.setup();
		const testFile = new File(['andree-photo'], 'andree-photo.png', { type: 'image/png' });

		// Obtenemos elementos del dom
		const inputTitulo1 = screen.getByPlaceholderText('Título 1');
		const inputTitulo2 = screen.getByPlaceholderText('Título 2');
		const inputTitulo3 = screen.getByPlaceholderText('Título 3');
		const inputDescripcion = screen.getByPlaceholderText('Descripción del slider');
		const inputFile = screen.getByLabelText(/Imagen/i);
		const buttonCrear = screen.getByRole('button', { name: 'Crear Slider' });

		//Llenamos el modal
		await user.type(inputTitulo1, 'Chimbote');
		await user.type(inputTitulo2, 'distrito ecológico');
		await user.type(inputTitulo3, 'para el futuro');
		await user.type(inputDescripcion, 'La ciudad de Chimbote es clave');
		await user.upload(inputFile, testFile);
		// Hacer click en el botón de crear
		await user.click(buttonCrear);
		// Verificar que se ha llamado a la función de crear
		expect(mockCreateSlider).toHaveBeenCalledTimes(1);
		// Verificar los datos enviados
		const datosEnviados = mockCreateSlider.mock.calls[0][0] as SliderRequest;
		expect(datosEnviados.titulo).toEqual(['Chimbote', 'distrito ecológico', 'para el futuro']);
		expect(datosEnviados.descripcion).toBe('La ciudad de Chimbote es clave');
		expect(datosEnviados.activo).toBe('true');
		expect(datosEnviados.direccionImagen).toBe(testFile);
		// toEqual -> compara arrays, objetos, etc.
		// toBe -> compara los valores como strings, booleanos, números, etc.

		//Verificar que se ha llamado a la función de handleModal
		expect(mockHandleModal).toHaveBeenCalledTimes(1);
	});
});
