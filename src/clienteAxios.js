import axios from "axios";

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKENDURL}`,
});

export default clientAxios;
