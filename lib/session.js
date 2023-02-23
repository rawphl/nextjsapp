import { useState, useEffect } from "react"

export const config = {
    cookieName: "session",
    password: process.env.SECRET_KEY,
    cookieOptions: {
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600
    }
}

export async function fetchSession() {
    const response = await fetch("/api/auth/session")

    if (!response.ok) {
        return Promise.reject()
    }

    const data = await response.json()
    return data
}

export function useSession() {
    const [didLoad, setDidLoad] = useState(false)
    const [session, setSession] = useState()

    useEffect(() => {
        const loadSession = async () => {
            try {
                const session = await fetchSession()
                setSession(session)
            } catch (e) {
                console.error("Not logged in!")
            } finally {
                setDidLoad(true)
            }
        }
        loadSession()
    }, [])

    return { didLoad, session }
}