import axios from 'axios';

export default function userServiceFactory() {
    function login(username: any, password: any) {
        return axios.post(`/api/auth`, { username, password });
    }

    return {login};
};

