import axios from 'axios';

const axiosInsctace = axios.create({
    baseURL: '/api/'
});

export default axiosInsctace;