import { config } from "@/lib/session"
import { withIronSessionApiRoute } from "iron-session/next"

export default withIronSessionApiRoute(handler, config)

export async function handler(req, res) {
    if (!req.session.user) {
        res.status(401).json({ message: "unauthorized" })
    }
    res.status(200).json({ message: "hello world!" })
}