import axios from "axios";
import { API_BASE_URL } from "@/lib/api";

const API_URL = `${API_BASE_URL}/api/colleges`;

export const getColleges = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_URL}?${params}`);
  return response.data; 
};
