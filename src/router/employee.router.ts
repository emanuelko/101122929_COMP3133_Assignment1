import { Router } from "express"
const router = Router()
import { sample_employee } from "../data"

router.get("/", (req,res) => {
    res.send(sample_employee)
})

export default router