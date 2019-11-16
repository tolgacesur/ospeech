class Cache {

	static _instance = null;
	
	static user;
	static room;

	static getInstance() {
		if (Cache._instance == null) {
			Cache._instance = new Cache();
		}

		return Cache._instance;
	}

	static setUser(user){
		Cache.user = user;
	}

	static setRoom(room){
		Cache.room = room;
	} 
}

export default Cache;