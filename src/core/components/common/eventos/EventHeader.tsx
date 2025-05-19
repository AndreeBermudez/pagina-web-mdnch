export const EventHeader = () => {
	return (
		<div className='w-full rounded-2xl text-blue-900 bg-gradient-to-r from-gray-100 to-white mb-4'>
			<div className='flex justify-between px-4 py-6'>
				<h2 className="text-2xl font-bold relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:h-1 after:w-16 after:bg-blue-600 after:rounded-full">
					Calendario de eventos
				</h2>
				<button className='text-white bg-blue-700 shadow-2xl rounded-sm p-2 transition-all duration-300 hover:bg-blue-900 hover:transform hover:-translate-y-1.5'>
					Ver más eventos
				</button>
			</div>
		</div>
	);
};
