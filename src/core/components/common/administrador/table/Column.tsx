export const Column = ({ children }: { children: React.ReactNode }) => {
	return (
		<td className='px-6 py-4 whitespace-nowrap'>
			<div className='text-sm text-gray-700 font-medium'>{children}</div>
		</td>
	);
};
