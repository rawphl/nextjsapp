import { config } from "@/lib/hooks/session"
import getConnection from "@/lib/database/getConnection"
import { withIronSessionApiRoute } from "iron-session/next"
import bcrypt from "bcrypt"

export default withIronSessionApiRoute(handler, config)

export async function handler(req, res) {
    if (req.method !== "POST") return res.status(400).json({ message: "bad request" })

    const { email, password } = req.body
    try {
        const connection = await getConnection()
        const [rows] = await connection.query("SELECT * FROM user WHERE email=?", [email])

        const user = rows[0]
        if (user) return res.status(401).json({ message: "unauthorized" })

        const password_hash = await bcrypt.hash(password, 10)
        const [result] = await connection.execute("INSERT INTO user (email, password) VALUES (?, ?)", [email, password_hash])

        req.session.user = {
            id: result.insertId,
            email: email
        }

        return res.status(200).json(req.session.user)
    } catch (e) {
        console.error(e)
        return res.status(401).json({ message: "unauthorized" })
    }

}
