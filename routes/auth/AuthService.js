'use strict';

class AuthService {
	constructor(db) {
		this.db = db;
	}

	resetPassword() {
		this.db.User.findOne({});
	}
}

module.exports = AuthService;
