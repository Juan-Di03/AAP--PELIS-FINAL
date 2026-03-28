import axios from 'axios';

const axiosInstance = axios.create({
  
  baseURL: import.meta.env.VITE_AXIOS_URL || "https://aap-pelis-final.onrender.com/api"
});

export {
    axiosInstance
}
