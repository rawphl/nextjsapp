import { config } from "@/lib/hooks/session"
import { withIronSessionApiRoute } from "iron-session/next"

export default withIronSessionApiRoute(handler, config)

export async function handler(req, res) {
    const session = req.session.user ?? null
    res.status(session ? 200 : 400).json(session)
}
