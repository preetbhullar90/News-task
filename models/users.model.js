const db = require('../db/connection');



exports.fetchAllUsers = () => {
    return db.query(`SELECT * FROM users;`)
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: 'User does not exist',
            })
        }
        return rows
    })
}