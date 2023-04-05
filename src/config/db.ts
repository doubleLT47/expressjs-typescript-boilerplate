import Knex from 'knex'
import { env } from '../index'
const knex = Knex({
	client: 'mssql',
	connection: {
		host: env.DB_HOST || '',
		port: Number(env.DB_PORT) || 1433,
		user: env.DB_USER || '',
		password: env.DB_PWD || '',
		database: env.DB_NAME || '',
	},
})

export default knex
