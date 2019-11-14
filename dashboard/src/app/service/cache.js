class Cache {

	static _instance = null;
	
	static user;

	static getInstance() {
		if (Cache._instance == null) {
			Cache._instance = new Cache();
		}

		return Cache._instance;
	}

	static setUser(user){
		Cache.user = user;
	}
}

export default Cache;