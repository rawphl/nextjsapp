import Link from "next/link"
import styles from "./Header.module.css"

export default function Header({ router, session, signOut }) {
    const handleClick = async (e) => {
        await signOut()
        await router.replace("/")
      }
    
    return (
        <header className={styles.header}>
            <Link href="/">nextjsapp</Link>
            {!session && <Link href="/auth/login">Login</Link>}
            {session && (
                <nav>
                    <ul>
                        <li><Link href="/auth/profile">{session.email}</Link></li>
                        <li><a href="#" onClick={handleClick}>Logout</a></li>
                    </ul>
                </nav>
            )}
        </header>
    )
}