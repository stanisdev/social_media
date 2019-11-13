'use strict';

class PostService {
	constructor({ db, auxiliaryTools }) {
		this.db = db;
		this.auxiliaryTools = auxiliaryTools;
	}

	/**
	 * Create new user's post
	 */
	async create({ user, content, state }) {
		const post = this.db.UserPost.build({
			uid: await this.auxiliaryTools.generateUid('UserPost'),
			user_id: user.id,
			content
		});
		post.setState(state);
		await post.save();
	}

	delete() {}
}

module.exports = PostService;
