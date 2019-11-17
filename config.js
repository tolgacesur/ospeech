require('dotenv').config()

var config = {
        database: {
                name:process.env.DB_NAME,
                host:process.env.DB_HOST,
                port:process.env.DB_PORT,
                username:process.env.DB_USERNAME,
                password:process.env.DB_PASSWORD
        },
	server : {
		port : process.env.PORT || process.env.APP_PORT
	},
        secretKey: process.env.JWT_SECRET_KEY,
}
module.exports = config;