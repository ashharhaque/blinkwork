import endpoint from "./../helpers/Endpoint";
import axios from "axios";
const api = axios.create({
    baseURL:endpoint ,
    headers: {
      'Content-Type': 'application/json'
    },
  })
  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['x-auth-token'] = token;
      }
      return config
    },
    error => Promise.reject(error)
  )
  export default api