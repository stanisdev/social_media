'use strict';

const Boom = require('@hapi/boom');

class PostService {
	constructor({ db, auxiliaryTools }) {
		this.db = PostService.db = db;
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

	/**
	 * Set or remove like in a user's post
	 */
	async like({ user, post, state }) {
		const { UserLike, UserPost } = this.db;
		const params = {
			user_id: user.id,
			user_post_id: post.id
		};
		const like = await UserLike.findOne({
			where: params
		});
		let action;
		
		/**
		 * Set like
		 */
		if (state === 1) {
			if (like instanceof Object) {
				throw Boom.badRequest('Estimate is set already');
			}
			action = 'set';
		}
		/**
		 * Remove like
		 */
		else {
			if (!(like instanceof Object)) {
				throw Boom.badRequest('Estimate was not set yet');
			}
			action = 'remove';
		}
		await UserPost.setOrRemoveLike(action, params);
	}

	/**
	 * Find post by uid (middleware)
	 */
	async findPost(req, h) {
		const post = await PostService.db.UserPost.findOne({
			where: { uid: req.params.post_uid }
		});
		if (!(post instanceof Object)) {
			throw Boom.badRequest('Unknown uid of post');
		}
		req.post = post;
		return 1;
	}

	delete() {}
}

module.exports = PostService;
