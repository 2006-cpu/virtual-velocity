import axios from 'axios';
const BASE_URL = '/api'

export const setLocalToken = (token) => {
    localStorage.setItem("token", token);
};
  
export const getLocalToken = () => {
    return localStorage.getItem("token");
};
  
export const removeLocalToken = () => {
    localStorage.removeItem("token");
};
