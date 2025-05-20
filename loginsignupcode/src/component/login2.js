import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4500/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                navigate("/dashboard", { replace: true });
            } else {
                setError(data.message || "Invalid email or password");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            <center>
                <h2>Login</h2>
                <form onSubmit={submitHandler}>
                    <div>
                        <input 
                            type="email" 
                            value={email} 
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            value={password} 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">Login</button>
                </form>
            </center>
            <p>Don't have an account? <Link to="/signup">Sign up here!</Link></p>
        </div>
    );
};

export default Login;