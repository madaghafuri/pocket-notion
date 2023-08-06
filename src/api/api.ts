import axios from 'axios';

const BASE_API_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8090/api/';

const api = axios.create({
    baseURL: BASE_API_URL,
});

export { api };
