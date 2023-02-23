import { config } from "@/lib/session"
import getConnection from "@/lib/database/getConnection"
import { withIronSessionApiRoute } from "iron-session/next"
import bcrypt from "bcrypt"

export default withIronSessionApiRoute(handler, config)

export async function handler(req, res) {
    if (req.method !== "POST") return res.status(400).json({ message: "bad request" })

    const { email, password } = req.body
    try {
        const conn = getConnection()
        const [rows] = await conn.query("SELECT * FROM user WHERE email=?", [email])

        const user = rows[0]
        if (user) return res.status(401).json({ message: "unauthorized" })

        const password_hash = await bcrypt.hash(password, 10)
        const [result] = await conn.execute("INSERT INTO user (email, password) VALUES (?, ?)", [email, password_hash])

        req.session.user = {
            id: result.insertId,
            email: email
        }

        return res.status(200).json({ session: req.session })
    } catch (e) {
        console.error(e)
        return res.status(401).json({ message: "unauthorized" })
    }

}
