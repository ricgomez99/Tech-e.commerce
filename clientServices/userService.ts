import axios from 'axios';

export default function userServiceFactory() {
    function login(email: any, password: any) {
        return axios.post(`/api/auth`, { email, password });
    }

    return {login};
};

