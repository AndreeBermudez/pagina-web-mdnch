export const RowLoader: React.FC = () => {
	return (
		<tr>
			<td colSpan={100} className='text-center py-6'>
				<div className='flex items-center justify-center'>
					<div className='animate-spin rounded-full h-5 w-5 border-2 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent mr-2'></div>
					<span className='text-sm text-gray-500'>Cargando...</span>
				</div>
			</td>
		</tr>
	);
};
