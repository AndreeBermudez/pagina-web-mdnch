import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:8080/api/authentication/',
	headers: {
		'Content-Type': 'multipart/form-data',
	},
});

export const axiosWithoutMultipart = axios.create({
	baseURL: 'http://localhost:8080/api/authentication/',
});

// --> Descomentar cuando este implementado el token de autenticación <--
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// )
