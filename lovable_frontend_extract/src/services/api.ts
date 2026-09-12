import axios from "axios";
export const api=axios.create({baseURL:import.meta.env["VITE_API_URL"]??"/api/",timeout:12000});
api.interceptors.request.use(config=>{if(typeof window!=="undefined"){const token=window.localStorage.getItem("access_token");if(token) config.headers.Authorization=`Bearer ${token}`;}return config;});
api.interceptors.response.use(r=>r,error=>Promise.reject(error));
