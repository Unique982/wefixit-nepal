import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json", // send vayirako data ko formate
    Accept: "application/json", // reciver huda kasto type ko fomate ko receive garna
  },
});
export default API;
