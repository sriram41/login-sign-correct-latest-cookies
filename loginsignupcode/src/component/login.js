import React, { useState } from "react"
import { useNavigate, Link} from "react-router-dom"

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const submitHandler = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:4500/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body : JSON.stringify({username, password})

            })
            const data = await response.json()
            if (data.token) {
                localStorage.setItem("token", data.token)
                navigate("/dashboard", {replace:true})
            } else {
                setError("invaild username and password")
            }
        } catch(error) {
            setError("something went wrong try again")
        }
    }
 

    return (
        <div>
            <center>
            <form onSubmit={submitHandler}>
        <input type="text" value={username} placeholder="name" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        {error && <p>invalid details</p>}
        <button type="submit">submit</button>
            </form>
  
            </center>
            <Link to = "/signup">signup here ?</Link>
        </div>
    )


}

export default Login