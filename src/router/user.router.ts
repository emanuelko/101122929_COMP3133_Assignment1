import { Router } from "express"
import { sample_user } from "../data"
import jwt from 'jsonwebtoken'
const router = Router()

router.post("/login", (req,res) => {
    const {email,password} = req.body
    const user = sample_user.find(user => user.email === email && user.password === password)

    if(user){
        res.send(generateTokenResponse(user))
        res.status(200).send("login successful")
    }else{
        res.status(400).send("credentials not valid")
    }
})

const generateTokenResponse = (user : any)=>{
    const token = jwt.sign({
        email: user.email, isAdmin:user.isAdmin
    },"randomkey", {
        expiresIn:"10d"
    })
    user.token = token
    return user
}

export default router