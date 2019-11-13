'use strict';

const nanoidGenerate = require('nanoid/async/generate');

class AuxiliaryTools {
	constructor({ db }) {
		this.db = db;
	}

	async generateUid(modelName) {
		for (let i = 0; i < 10; i++) {
			const uid = await nanoidGenerate('1234567890', 11);
			const entity = await this.db[modelName].findOne({
				where: { uid },
				attributes: ['id']
			});
			if (!(entity instanceof Object)) {
				return uid;
			}
		}
		throw new Error('Unexpected error. The uid value cannot be generated.');
	}
}

module.exports = AuxiliaryTools;
