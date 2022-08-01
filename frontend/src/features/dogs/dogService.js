import axios from 'axios';

const API_URL = '/api/dogs/'

const getDogs = async () => {
    const response = await axios.get(API_URL);
    
    return response.data;
};

const createDog = async (dogData) => {
    const config = { withCredentials: true };
    const response = await axios.post(API_URL, dogData, config);

    return response.data;
};

const getDog = async (id) => {
    const response = await axios.get(`${API_URL}${id}`);
    
    return response.data;
};

const deleteDog = async (id) => {
    const config = { withCredentials: true };
    const response = await axios.delete(`${API_URL}${id}`, config);

    return response.data;
};

const updateDog = async (data) => {
    const { id, ...dogData } = data;
    const config = { withCredentials: true };
    const response = await axios.put(`${API_URL}${id}`, dogData, config);

    return response.data;
};

const dogService = {
    getDogs,
    createDog,
    getDog,
    deleteDog,
    updateDog,
};

export default dogService;