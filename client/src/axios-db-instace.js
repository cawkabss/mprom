import axios from 'axios';

const axiosInsctace = axios.create({
    baseURL: 'https://react-parser-prom.firebaseio.com'
});

export default axiosInsctace;