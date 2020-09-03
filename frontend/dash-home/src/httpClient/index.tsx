import Axios from 'axios';

const axios = Axios.create({});
axios.interceptors.response.use(
    (response: any) => response,
    (error: { message: string; }) => {
        if (error.message === 'Network Error') {
            return Promise.reject({ response: { status: 500, error } });
        }
        return Promise.reject(error);
    }
);

export default axios;