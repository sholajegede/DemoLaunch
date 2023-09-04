import axios from "axios";

const API_BASE_URL = "https://api-backend-sn5e.onrender.com/api";

//Real
// https://api-backend-sn5e.onrender.com/api

//Test
//http://localhost:8800/api

//Old
//https://getcollabov2.up.railway.app/api
//https://collabov1.up.railway.app/api

interface Request {
  method: string;
  url: string;
  data?: object;
}

const newRequest = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const makeRequest = async ({ method, url, data }: Request) => {
  const response = await newRequest({ method, url, data });
  return response.data;
};

export default newRequest;
