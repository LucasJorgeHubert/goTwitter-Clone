import axios from 'axios';

const api = axios.create({
    /**Insira em baseURL o IP da maquina que está sendo utilizada como base de dados */
    baseURL: 'http://192.168.1.101:5000'
});
export default api;