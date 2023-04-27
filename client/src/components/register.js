import {redirect} from "react-router-dom"
import useEffect from "react"

export default function Register() {
    
    async function handleRegister(e) {
        e.preventDefault()
        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
    }

    useEffect(() => {
        fetch("/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? redirect("/dashboard"): null)
    }, [])

    return (
        <form onSubmit={event => handleRegister(event)}>
            <input required type="email"/>
            <input required type="password"/>
            <input type="submit" value="Register"/>
        </form>
    )
}