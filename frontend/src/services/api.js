import axios from 'axios';
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api', 
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Adding JWT token to request:', config.url);
    } else {
        console.log('No JWT token found for request:', config.url);
    }
    return config;
}, error => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 403) {
            console.error('403 Forbidden - JWT token might be invalid or missing');
            console.error('Request URL:', error.config?.url);
            console.error('Request headers:', error.config?.headers);
            
            // If it's a 403 on a protected endpoint, redirect to login
            if (error.config?.url && !error.config.url.includes('/auth/')) {
                localStorage.removeItem('jwt_token');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;