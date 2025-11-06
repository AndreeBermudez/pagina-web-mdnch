import { axiosWithoutMultipart } from '../../../api/axiosInstance';

export interface LoginRequest {
	username: string;
	password: string;
}

export interface LoginResponse {
	success: boolean;
	message: string;
	data: {
		token: string;
		username: string;
		rol: string;
		tokenType: string;
		expiresAt: number;
	};
}

interface DecodedToken {
	rol: string;
	sub: string; // username
	iat: number;
	exp: number;
}

// Función para decodificar el JWT
const decodeToken = (token: string): DecodedToken | null => {
	try {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
				.join('')
		);
		return JSON.parse(jsonPayload);
	} catch (error) {
		console.error('Error al decodificar token:', error);
		return null;
	}
};

export const logearUsuario = async (credentials: LoginRequest): Promise<LoginResponse> => {
	try {
		const response = await axiosWithoutMultipart.post<LoginResponse>('login', credentials);
		
		// Si el login es exitoso, guardar SOLO el token en localStorage
		if (response.data.success && response.data.data.token) {
			localStorage.setItem('authToken', response.data.data.token);
		}
		
		return response.data;
	} catch (error: any) {
		// Manejar errores de autenticación
		if (error.response?.data) {
			throw new Error(error.response.data.message || 'Credenciales incorrectas');
		}
		throw new Error('Error al conectar con el servidor');
	}
};

export const logout = () => {
	localStorage.removeItem('authToken');
};

export const getAuthToken = (): string | null => {
	return localStorage.getItem('authToken');
};

export const getUserRole = (): string | null => {
	const token = getAuthToken();
	if (!token) return null;
	
	const decoded = decodeToken(token);
	return decoded?.rol || null;
};

export const getUsername = (): string | null => {
	const token = getAuthToken();
	if (!token) return null;
	
	const decoded = decodeToken(token);
	return decoded?.sub || null;
};

export const isAuthenticated = (): boolean => {
	const token = getAuthToken();
	
	if (!token) return false;
	
	const decoded = decodeToken(token);
	if (!decoded) return false;
	
	// Verificar si el token ha expirado (exp está en segundos)
	const now = Math.floor(Date.now() / 1000);
	if (now > decoded.exp) {
		logout();
		return false;
	}
	
	return true;
};
