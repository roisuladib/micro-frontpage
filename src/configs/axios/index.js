import axios from 'axios';
import errorHandler from './errorHandler';

const Instance = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
});

Instance.interceptors.response.use(response => response.data, errorHandler);

export default Instance; 