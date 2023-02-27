import mysql from "mysql2"
import fs from "fs"
import path from "path"

const ENV = process.env.NODE_ENV


const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

if (ENV === "production") {
    config.ssl = {
        ca: fs.readFileSync(path.resolve(process.cwd(), "lib", "database", "DigiCertGlobalRootCA.crt.pem"))
    }
}

const pool = mysql.createPool(config).promise()


export default function getConnection() {
    return pool
}