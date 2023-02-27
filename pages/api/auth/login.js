import { config } from "@/lib/hooks/session"
import getConnection from "@/lib/database/getConnection"
import { withIronSessionApiRoute } from "iron-session/next"
import bcrypt from "bcrypt"

export default withIronSessionApiRoute(handler, config)

export async function handler(req, res) {
    if (req.method !== "POST") return res.status(400).json({ message: "bad request" })
    const { email, password } = req.body

    const { connection } = await getConnection()
    const [rows] = await connection.query("SELECT * FROM user WHERE email=?", [email])
    const user = rows[0]

    if (!user) return res.status(401).json({ message: "unauthorized" })

    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (passwordsMatch) {
        req.session.user = {
            id: user.id,
            email: user.email
        }
        await req.session.save()
        res.status(200).json(req.session.user)
    } else {
        res.status(401).json({ message: "unauthorized" })
    }
}