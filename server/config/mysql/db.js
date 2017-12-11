'use strict'

var mysql =require('mysql');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'evue'
})

export default (sql, values) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err)
			} else {
				connection.query(sql, values, (err, rows) => {
					if (err) {
						reject(err)
					} else {
						resolve(rows)
					}
					connection.release()
				})
			}
		})
	})
}