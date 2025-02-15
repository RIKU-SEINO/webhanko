import axios from 'axios';
const baseURL = 'http://localhost:3001/api/v1';

// common headers
const headers = {
  'Content-Type': 'application/json',
};

// initial setup for axios
export const apiClient = axios.create({ baseURL, headers });

// response interceptor (error handling)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    switch (error?.response?.status) {
      case 401:
        break;
      case 404:
        break;
      default:
        console.error("== internal server error ==");
    };

    const errorMessage = (error?.response?.data?.message || "").split(",");
    throw new Error(errorMessage);
  }
);