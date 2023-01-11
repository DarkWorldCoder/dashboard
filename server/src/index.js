import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import clientRoutes from "./routes/client.js"
import generalRoutes from "./routes/general.js"
import managementRoutes from "./routes/management.js"
import salesRoutes from "./routes/sales.js"

// data imports
import Product from './model/Product.js'
import ProductStat from './model/ProductStat.js'
import User from './model/User.js'
import Transaction from './model/Transaction.js'
import {dataAffiliateStat,dataOverallStat,dataUser,dataProductStat,dataProduct,dataTransaction} from "./data/index.js"
import OverallStat from './model/OverallStat.js'
import AffiliateStat from './model/AffiliateStat.js'


dotenv.config()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())


// routes

app.use("/client",clientRoutes)
app.use("/general",generalRoutes)
app.use("/management",managementRoutes)
app.use("/sales",salesRoutes)

// mongoose setup

const PORT = process.env.PORT || 5001

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>console.log(`Server port ${PORT}`))
    
    // AffiliateStat.insertMany(dataAffiliateStat)
    // OverallStat.insertMany(dataOverallStat)
    // Transaction.insertMany(dataTransaction)
    //  Product.insertMany(dataProduct)
    //  ProductStat.insertMany(dataProductStat)
})
.catch((error)=>console.log(`${error}`))
