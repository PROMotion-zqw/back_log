const express = require('express');
const router = express.Router();
module.exports = function() {
	router.use((req, res) => {
		switch (req.method) {
			case "POST":
				if(req.url === "/api/ads") {
					console.log('POST ##', req.body);
				}
				break;
			case "GET":
				if(req.url === "/api/ads") {
					console.log('adddddds');
					res.send("Hello ads")
				}
				break;
			case "DELETE":
				break;
			case "PUT":
				break;
		}
	})
	return router;
}
