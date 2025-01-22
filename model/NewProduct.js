import mongoose from "mongoose";
const NewProduct=new mongoose.Schema({
productName:{
    type:String,
    required:true,
    // unique:true
},
productDesc:{
    type:String,
    required:true,
},
productImage:{
    type:String,
    required:true,
}
},{timestamps:true})
export default mongoose.model('masalaProducts',NewProduct)