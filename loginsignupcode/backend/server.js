const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const bodyparser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(bodyparser.json())
app.use(cors())

const users =[]
const jwt_secret = "your_secret_key"
const port = 4500

app.post("/signup", async(req, res) => {
    const {username, password} = req.body
    const existingusers = users.find((user) => user.username === username)
    if (existingusers){
        return res.status(400).json({message:"username already existing"})
    }
    const hashpassword = await bcrypt.hash(password, 10)
    const newusers = {id:Date.now(), username, password:hashpassword}
    users.push(newusers)
    const token = jwt.sign({id:newusers.id, username:newusers.id }, jwt_secret, {expiresIn:"1hr"})
    res.status(201).json({message:"successfully registered", token})
})

app.post("/login", async(req, res) => {
    const {username, password} = req.body
    const user = users.find((user) => user.username === username)
    if (!user) {
        return res.status(400).json({message:"invalid username and password"})
    }
    const validpassword = await bcrypt.compare(password, user.password)
    if (!validpassword) {
       return res.status(400).json({message:"invalid username and password"})
    }
    const token = jwt.sign({id:user.id, username:user.username},jwt_secret, {expiresIn:"1hr"}) 
    res.status(201).json({message:"successfully login", token})
})


app.get("/protectrouter", (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader&&authHeader.split(" ")[1]

    if (!token) return res.sendStatus(401)

    jwt.verify(token, jwt_secret, (err, user) => {
        if(err) return res.sendStatus(403)
            res.json({message:"route protected", user})
    })    
})

app.listen(port, () => {
    console.log(`server running: http://localhost:${port}`)
})