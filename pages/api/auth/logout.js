import { config } from "@/lib/session"
import { withIronSessionApiRoute } from "iron-session/next"

export default withIronSessionApiRoute(handler, config)

export async function handler(req, res) {
    req.session.destroy()
    res.status(200).json({ session: null })
}
