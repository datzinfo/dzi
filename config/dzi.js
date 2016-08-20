module.exports = {
	'hostname': process.env.OPENSHIFT_APP_DNS || 'localhost',
	'secret': '#thrivesonhappycustomers@datzinfo',
	'durationInMinutes': 60,
	'env': process.env.NODE_ENV || 'development',

	'development': {
		////////
		// db
		////////
		'username': 'root',
		'password': 'admin',
		'database': 'dziws_dev',
		'host': '127.0.0.1',
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
		'emailFrom': 'kkkkk97855@yahoo.com',
		'mailer': {
			    host : 'smtp.mail.yahoo.com',
			    secureConnection : false,
			    port: 465,
			    auth : {
			        user : 'kkkkk97855@yahoo.com',
			        pass : 'buyNbuy88'
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
		'emailFrom': 'enquiry@datzinfo.com',
		'mailer': {
			    host : 'smtp.mail.yahoo.com',
			    secureConnection : false,
			    port: 465,
			    auth : {
			        user : 'kkkkk97855@yahoo.com',
			        pass : 'buyNbuy88'
			    }
			  }
	}
};