import mysql from "mysql2"

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

const pool = mysql.createPool(config).promise()

export default function getConnection() {
    return pool
}