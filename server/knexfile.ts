import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'postgresql',
		connection: {
			host: process.env.DB_HOST,
			database: process.env.POSTGRES_DB,
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		},
		debug: true
	},
	test: {
		client: 'postgresql',
		connection: {
			host: process.env.DB_HOST,
			database: process.env.TEST_DB,
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	},
	production: {
		client: 'postgresql',
		connection: {
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}
};

module.exports = config;
