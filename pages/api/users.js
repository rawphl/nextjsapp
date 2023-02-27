import getConnection from "@/lib/database/getConnection"

export default async function handler(req, res) {
    const { connection } = await getConnection()
    const [rows] = await connection.query("SELECT * FROM user")
    rows.forEach(user => delete user.password)
    res.status(200).json(rows)
}