// Utilidad para obtener clases de color según el tipo
export const getColorClasses = (color: string) => {
	switch (color) {
		case 'blue':
			return {
				border: 'border-l-4 border-blue-500',
				badge: 'bg-blue-100 text-blue-700',
			};
		case 'green':
			return {
				border: 'border-l-4 border-green-500',
				badge: 'bg-green-100 text-green-700',
			};
		case 'orange':
			return {
				border: 'border-l-4 border-orange-500',
				badge: 'bg-orange-100 text-orange-700',
			};
		default:
			return {
				border: 'border-l-4 border-gray-500',
				badge: 'bg-gray-100 text-gray-700',
			};
	}
};
