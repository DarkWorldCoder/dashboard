import express from 'express'
import {getUser,getDashboardStats} from "../controllers/general.js"

const router = express.Router()

router.route("/user/:id").get(getUser);

router.get("/dashboard",getDashboardStats)

export default router