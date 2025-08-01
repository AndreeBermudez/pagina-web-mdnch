import { Toaster } from 'sonner';
import { AppRouter } from './core/routes/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const AppContainer = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 5 * 60 * 1000, // 5 minutos
				refetchOnWindowFocus: false,
				refetchOnMount: true,
			},
		},
	});

	return (
		<>
			<Toaster position='top-right' expand={true} visibleToasts={10} />
			<QueryClientProvider client={queryClient}>
				<AppRouter />
			</QueryClientProvider>
		</>
	);
};
