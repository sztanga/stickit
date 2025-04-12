import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        const url = err.config?.url;

        const isAuthCheck = url?.includes('/me');
        const isLoginAttempt = url?.includes('/login');

        if (err.response?.status === 401 && !isAuthCheck && !isLoginAttempt) {
            window.location.href = '/login';
        }

        return Promise.reject(err);
    }
);

export default api;
