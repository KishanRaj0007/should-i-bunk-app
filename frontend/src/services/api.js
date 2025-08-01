import axios from 'axios';
// This file will configure axios to always talk to our Spring Boot server and to automatically include the JWT on every request.
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api', // The base URL of our Spring Boot backend
    headers: {
        'Content-Type': 'application/json'
    }
});

// VERY IMPORTANT: Interceptor to add the JWT to every request
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default apiClient;
// This interceptor is the frontend equivalent of the JwtAuthenticationFilter that I have built in the backend. 
// It checks localStorage for a token and attaches it as a Bearer token if it exists.