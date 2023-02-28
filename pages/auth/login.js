import { useRouter } from "next/router"
import { useState } from "react"
import Head from "next/head"
import styles from "./login.module.css"

const validate = (model) => {
    let errors = null

    if (model.email?.trim() === "" || !model.email?.includes("@")) {
        errors = errors || {}
        errors.email = "Email can't be empty and must contain an @"
    }

    if (model.password?.trim() === "") {
        errors = errors || {}
        errors.password = "Password can't be empty"
    }

    return errors
}

export default function LoginPage({ signIn }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [model, setModel] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState(null)

    const handleChange = (e) => {
        e.preventDefault()
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors(null)
        setIsSubmitting(true)

        const errors = validate(model)

        if (errors) {
            setErrors(errors)
            setIsSubmitting(false)
            return
        }

        const action = e.nativeEvent.submitter.name

        const response = await fetch(`/api/auth/${action}`, {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(model)
        })

        if (!response.ok) {
            setErrors({
                login: "Authentication failed"
            })
            setIsSubmitting(false)
            return
        }
        const data = await response.json()
        signIn(data)
        setIsSubmitting(false)
        await router.push(router.query.next || "/")
    }

    return (
        <>
            <Head>
                <title>Authenticate</title>
            </Head>
            <main className={styles.login}>
                {isSubmitting && <div>Loading...</div>}
                <form onSubmit={handleSubmit}>
                    <h1>Authenticate</h1>
                    <span>{errors?.login}</span>
                    <input type="text" name="email" onChange={handleChange} value={model.email} />
                    <span>{errors?.email}</span>

                    <input type="password" name="password" onChange={handleChange} value={model.password} />
                    <span>{errors?.password}</span>

                    <input type="submit" name="login" value="Login" />
                    <input type="submit" name="register" value="Register" />
                </form>
            </main>
        </>
    )
}