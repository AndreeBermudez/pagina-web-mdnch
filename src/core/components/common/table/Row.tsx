export const Row = ({ children }: { children: React.ReactNode }) => {
	return (
		<tr className='hover:bg-gray-50'>
			{children}
		</tr>
	);
};
