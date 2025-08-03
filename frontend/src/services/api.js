import axios from 'axios';
// This file will configure axios to always talk to our Spring Boot server and to automatically include the JWT on every request.
// The app will use the VITE_API_BASE_URL when deployed,
// and the localhost URL as a fallback for local development.
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api', 
    headers: {
        'Content-Type': 'application/json'
    }
});

// VERY IMPORTANT: Interceptor to add the JWT to every request
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

// Response interceptor to handle authentication errors
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
// This interceptor is the frontend equivalent of the JwtAuthenticationFilter that I have built in the backend. 
// It checks localStorage for a token and attaches it as a Bearer token if it exists.