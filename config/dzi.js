module.exports = {
	'sitename': 'datzinfo',
	'hostname': process.env.OPENSHIFT_APP_DNS || 'localhost',
	'secret': '#thrivesonhappycustomers@datzinfo',
	'durationInMinutes': 60,
	'env': process.env.NODE_ENV || 'development',

	'development': {
		////////
		// db
		////////
		"username": "kf",
	    "password": "fung",
	    "database": "dziws_dev",
	    "host": "192.168.1.11",
	    "dialect": "mysql",			
			
		////////
		// social
		////////
		'facebook': {
			    clientID: 'APP_ID',
			    clientSecret: 'APP_SECRET',
			    callbackURL: 'http://localhost:3000/auth/facebook/callback'
			  },
		'twitter': {
			    clientID: 'CONSUMER_KEY',
			    clientSecret: 'CONSUMER_SECRET',
			    callbackURL: 'http://localhost:3000/auth/twitter/callback'
			  },
		'github': {
			    clientID: 'APP_ID',
			    clientSecret: 'APP_SECRET',
			    callbackURL: 'http://localhost:3000/auth/github/callback'
			  },
		'google': {
			    clientID: 'APP_ID',
			    clientSecret: 'APP_SECRET',
			    callbackURL: 'http://localhost:3000/auth/google/callback'
			  },
		'linkedin': {
			    clientID: 'API_KEY',
			    clientSecret: 'SECRET_KEY',
			    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
			  },

		////////
		// email
		////////
		'emailFrom': 'datz2info@gmail.com',
		'mailer': {
			    host : 'smtp.gmail.com',
			    secureConnection : true,
			    port: 465,
			    auth : {
			        user : 'datz2info@gmail.com',
			        pass : 'd@+$!nfo'
			    }
			 }
	},
	'production': {
		////////
		// db
		////////
		'username': 'admindPthlH1',
		'password': '8BpQgcqsgwKP',
		'database': 'dziws',
		'host': process.env.OPENSHIFT_MYSQL_DB_HOST,
		'port': process.env.OPENSHIFT_MYSQL_DB_PORT,
		'dialect': 'mysql',
		
		////////
		// social
		////////
		'facebook': {
			    clientID: 'APP_ID',
			    clientSecret: 'APP_SECRET',
			    callbackURL: 'http://localhost:3000/auth/facebook/callback'
			  },
		'twitter': {
			    clientID: 'CONSUMER_KEY',
			    clientSecret: 'CONSUMER_SECRET',
			    callbackURL: 'http://localhost:3000/auth/twitter/callback'
			  },
		'github': {
			    clientID: 'APP_ID',
			    clientSecret: 'APP_SECRET',
			    callbackURL: 'http://localhost:3000/auth/github/callback'
			  },
		'google': {
			    clientID: 'APP_ID',
			    clientSecret: 'APP_SECRET',
			    callbackURL: 'http://localhost:3000/auth/google/callback'
			  },
		'linkedin': {
			    clientID: 'API_KEY',
			    clientSecret: 'SECRET_KEY',
			    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
			  },

		////////
		// email
		////////
		'emailFrom': 'datz2info@gmail.com',
		'mailer': {
			    host : 'smtp.gmail.com',
			    secureConnection : true,
			    port: 465,
			    auth : {
			        user : 'datz2info@gmail.com',
			        pass : 'd@+$!nfo'
			    }
			 }
	}
};