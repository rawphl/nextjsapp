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
    const [isLoading, setIsLoading] = useState()
    const [session, setSession] = useState()

    useEffect(() => {
        if (isLoading) return
        setIsLoading(true)
        const loadSession = async () => {
            try {
                const data = await fetchSession()
                setSession(data)
            } catch (e) {
                console.error("Not logged in!")
            } finally {
                setIsLoading(false)
            }
        }
        loadSession()
    }, [])

    const signIn = (data) => setSession(data)
    const signOut = async () => {
        await fetch("/api/auth/logout")
        setSession()
    }



    return {
        isInitialized: isLoading === false,
        session,
        signIn,
        signOut
    }
}