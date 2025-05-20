import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4500/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });
            
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                navigate("/dashboard", { replace: true });
            } else {
                setError(data.message || "Invalid registration details");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            <center>
                <h2>Sign Up</h2>
                <form onSubmit={submitHandler}>
                    <div>
                        <input 
                            type="text" 
                            value={username} 
                            placeholder="Username" 
                            onChange={(e) => setUsername(e.target.value)} 
                            required
                        />
                    </div>
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
                    <button type="submit">Sign Up</button>
                </form>
            </center>
            <p>Already have an account? <Link to="/login">Login here!</Link></p>
        </div>
    );
};

export default Signup;