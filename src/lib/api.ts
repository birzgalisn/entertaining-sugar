import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_MAPON_API_URL,
  params: {
    key: import.meta.env.VITE_MAPON_API_KEY,
  },
  transformRequest: [
    (data) => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    (data) => {
      return JSON.parse(data);
    },
  ],
});

export default api;
