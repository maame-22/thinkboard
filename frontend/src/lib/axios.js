import axios from 'axios'
const Base_Url = import.meta.env.MODE=='development'? "http://localhost:3000/api" :"/api"
const api = axios.create({
    baseURL:Base_Url
})

export default api