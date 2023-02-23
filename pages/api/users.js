import getConnection from "@/lib/database/getConnection"

export default async function handler(req, res) {
    const conn = getConnection()
    const [rows] = await conn.query("SELECT * FROM user")
    rows.forEach(user => delete user.password)
    res.status(200).json(rows)
}