import axios from 'axios';

const API_URL = '/api/users/';

const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(`${API_URL}login`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
};

const logout = async () => {
    const response = await axios.post(`${API_URL}logout`, {});

    if (response.data) {
        localStorage.removeItem('user');
    }
    
    return response.data;
};

const authService = {
    register,
    login,
    logout,
};

export default authService;