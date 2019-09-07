import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-cf84f.firebaseio.com/'
});

export default instance;