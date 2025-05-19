import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()


    useEffect(() => {
        window.history.pushState(null,"", window.location.href)
        window.onpopstate = () => {
            window.history.pushState(null,"", window.location.href)

        }
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem("token")
        navigate("/login", {replace:true})
    }



  return (
    <div>
        <h2>welcome to the dashboard</h2>
        <button onClick={logoutHandler}>logout</button>
    </div>
  )
}

export default Dashboard