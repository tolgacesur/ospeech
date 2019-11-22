import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_URL;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
	config.headers.authorization = ApiService.getToken();
	return config;
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
	return response ? response.data || {} : {};
}, function (err) {

	if (err.response && err.response.status === 401) {
		ApiService.logout();
	}

	if (!err.response || !err.response.data || !err.response.data.message){
		return Promise.reject({message : 'Oops Something Went Wrong!'});
	}

	return Promise.reject(err.response.data);
});

export default class ApiService {

	static getToken(){
		return localStorage.getItem('ospeech-token') || undefined;
	}

	static login({email, password}){
		return axios.post(`/user/login`, {email, password}).then(res => {
			localStorage.setItem('ospeech-token', res.token);
		});
	}

	static register({username, password, email}){
		return axios.post(`/user/register`, {username, email, password}).then(res => {
			localStorage.setItem('ospeech-token', res.token);
		});
	}

	static getAppData(){
		return axios.get(`/api/app-data`).then(data => {
			return data;
		});
	}

	static logout(){
		return axios.get('/user/logout').then(() => {
			localStorage.setItem('ospeech-token', '');
			window.location = '/';
		});
	}
}