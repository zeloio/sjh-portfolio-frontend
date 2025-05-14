const express = require('express')
const path = require('path')

class Server {
    constructor() {
		this.app = express()
		
		// system init
		this.systemInit()
	}
	
	/**
	 * creazione del servizio expressjs node
	 */
    static bootstrap() {
      return new Server()
	}

	/**
	 * - init server conf
	 * - mappatura delle route
	 */
	systemInit() {
    this.config()
	}

	config() {
		// cors
		this.app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*")
			res.header("Access-Control-Allow-Methods", "*")
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-RapidAPI-Proxy-Secret")
			
			next()
		})

		this.app.use(express.static(path.join(__dirname, 'dist')))		

		// error handler
		this.app.use(function(err, req, res, next) {
			// set locals, only providing error in development
			res.locals.message = err.message
			res.locals.error = req.app.get('env') === 'development' ? err : {}

			// render the error page
			res.status(err.status || 500)
			res.render('error')
		})
		
		// listen port
		let port = 8080

		// port =  |

		this.app.listen(port, () => {
			console.log("Express service started:")
			console.log('Listening on port ' + port)
		})
	}
}

var server = Server.bootstrap()
module.exports = server.app