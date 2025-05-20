const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyparser.json());
app.use(cors());

const users = [];
const jwt_secret = "your_secret_key";
const port = 4500;

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    
    // Check if username or email already exists
    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "Username or email already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: Date.now(),
        username,
        email,
        password: hashedPassword
    };
    
    users.push(newUser);
    const token = jwt.sign(
        { id: newUser.id, username: newUser.username, email: newUser.email },
        jwt_secret,
        { expiresIn: "1h" }
    );
    
    res.status(201).json({ message: "Successfully registered", token });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    
    const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        jwt_secret,
        { expiresIn: "1h" }
    );
    
    res.status(200).json({ message: "Successfully logged in", token });
});

app.get("/protected-route", (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, jwt_secret, (err, user) => {
        if (err) return res.sendStatus(403);
        res.json({ message: "Route protected", user });
    });
});

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
});