import axios from 'axios';
import Cache from './cache';

axios.defaults.baseURL = 'http://ospeech.org';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
	config.headers.authorization = ApiService.getToken();
	return config;
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
	return response ? response.data || {} : {};
}, function (err) {

	if (err.response.status === 401) {
		ApiService.logout();
	}

	err = err.response ? err.response.data : {message : 'Oops Something Went Wrong!'};
	return Promise.reject(err);
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