import EventosContainer from "../../core/components/common/page/publicaciones/eventos/EventosContainer";
import { Layout } from "../../core/layout/Layout";

const EventosPage = () => {
	return (
		<Layout>
			<main className='bg-gradient-to-br from-slate-100 to-slate-200 min-h-[calc(100vh-4rem)]'>
				<div className='container px-10 pt-10 mx-auto md:px-15 md:pt-24 pb-25'>
					<div className='mb-10 text-center'>
						<h1 className='text-4xl font-bold text-gray-800'>EVENTOS</h1>
						<div className='w-24 h-1 mx-auto mt-4 bg-blue-500' />
					</div>
					<EventosContainer />
				</div>
			</main>
		</Layout>
	);
};

export default EventosPage;
