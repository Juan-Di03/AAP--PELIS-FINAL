import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://aap-pelis-final.onrender.com'
});

export {
    axiosInstance
}
