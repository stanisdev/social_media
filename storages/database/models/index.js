'use strict';

const { pickBy } = require('lodash');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'local';
const config = require('../../../config/database.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

fs.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		);
	})
	.forEach(file => {
		const model = sequelize['import'](path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/**
 * Prevent being displayed an error as unfriendly
 */
db.logError = (error) => {
	let output;
	if (!(error instanceof Error)) {
		output = { name: 'NotAnError' };
	} else {
		switch (error.name) {
			case 'SequelizeValidationError': {
				try {
					const data = JSON.parse(JSON.stringify(error));
					const { errors } = data;
					const result = errors.map(error => {
						return pickBy(error, (_, key) => ['message', 'type', 'value'].includes(key));
					});
					output = {
						name: error.name,
						errors: result
					};
					break;
				} catch (error) {}
			}
			default:
				output = { name: 'UnknownError' };
				break;
		}
	}
	console.log(output);
};

module.exports = db;
