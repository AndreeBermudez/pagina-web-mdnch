import { redirect } from 'react-router-dom';

export const PrivateGuard = () => {
	const isAuthenticated = true;
	return !isAuthenticated ? redirect("/inicio") : null;
};
