'use strict';

const PostService = require('./PostService');

const plugin = {
	name: 'Post routes',
	register: async function(server, _options) {
		const postService = new PostService(server.app);
		const options = { postService };

		await server.register([{ plugin: require('./create'), options }]);
		await server.register([{ plugin: require('./like'), options }]);
	}
};

module.exports = plugin;
