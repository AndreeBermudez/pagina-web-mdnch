interface TableProps {
	children: React.ReactNode;
	headers: string[];
}

const HEADER_STYLE =
	'px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap';

export const Table = ({ children, headers }: TableProps) => {
	return (
		<>
			<div className='overflow-x-auto'>
				<table className='bg-gray-100 w-full'>
					<thead>
						<tr>
							{headers.map((title, index) => (
								<th key={index} className={HEADER_STYLE}>
									{title}
								</th>
							))}
						</tr>
					</thead>
					{children}
				</table>
			</div>
		</>
	);
};
