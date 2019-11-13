import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:3000';

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

	static getRooms(){
		return axios.get(`/rooms`).then(rooms => {
			return rooms;
		});
	}

	static logout(){
		localStorage.setItem('ospeech-token', '');
		return Promise.resolve();
	}
}