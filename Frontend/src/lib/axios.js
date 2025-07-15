import axios from 'axios';

export const axiosInstance = axios.create({ 
    baseURL: "https://chat-app-full-stack-psi.vercel.app/api",  
    withCredentials: true
});
