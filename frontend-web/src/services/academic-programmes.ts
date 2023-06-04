import axios from "axios";

const BASE_URL = "http://localhost:1337/api/academic-programmes";
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const config = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

const getMany = () => {
  return axios
    .get(BASE_URL, config)
    .then((res) => res.data)
    .catch((error) => {
      alert("Unable to get academic programmes registered");
      console.log(error);
    });
};

const getById = (id: number) => {
  return axios.get(`${BASE_URL}/${id}`, config).then((res) => res.data);
};

export default {
  getMany,
  getById,
};
