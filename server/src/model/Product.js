import mongoose from 'mongoose'


const ProductScheam = new mongoose.Schema(
{
    name:String,
    price:Number,
    description:String,
    category:String,
    rating:Number,
    supply:Number
},{
    timestamps:true
})
const Product = mongoose.model("Product",ProductScheam)
export default Product