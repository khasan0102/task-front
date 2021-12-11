const { Pool } = require('pg')


const pool = new Pool({
    connectionString: 'postgres://postgres:1@localhost:5432/app'
})

const fetch = async (sqlQuery, ...params) => {
	const client = await pool.connect()
	try {
		const { rows: [ row ] } = await client.query(sqlQuery, params.length ? params : null)
		return row
	} catch(error) {
		console.log(error)
	} finally {
		await client.release()
	}
}

const fetchAll = async (sqlQuery, ...params) => {
	const client = await pool.connect()
	try {
		const { rows } = await client.query(sqlQuery, params.length ? params : null)
		return rows
	} catch(error) {
		console.log(error)
	} finally {
		await client.release()
	}
}

module.exports = { fetch, fetchAll }