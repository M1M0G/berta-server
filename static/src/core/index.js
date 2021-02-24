import axios from 'axios';

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common["token"] = window.localStorage.token;
// axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
window.axios = axios;

export default axios;