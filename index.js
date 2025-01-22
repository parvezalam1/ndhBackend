import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import multer from 'multer';
import NewProduct from './model/NewProduct.js';
import fs from 'fs'
dotenv.config()
let app = express();
let PORT = process.env.PORT || 3032;
app.use(cors())
app.use(express.json())

const connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log('Database Connected!')
        }).catch((err) => {
            console.log('Database not connected!')
        })
}

app.post('/', async (req, res) => {
    let newProduct = new NewProduct({ ...req.body })
    await newProduct.save()
    res.status(200).json('Product has been add successfully!')
})

app.get('/',async(req,res)=>{
    let AllProduct=await NewProduct.find({})
    if(!AllProduct) return res.status(201).json('Not Product Available!')
    res.status(200).json(AllProduct)
})

app.get('/:pid',async(req,res)=>{
    let singleProduct=await NewProduct.findOne({_id:req.params.pid})
    if(!singleProduct) return res.status(201).json('Not Product Available!')
    res.status(200).json(singleProduct)
})

app.delete('/:pid',async(req,res)=>{
    let fetchData=await NewProduct.findOne({_id:req.params.pid})
    if(!fetchData) return res.status(201).json('Something went wrong!')
    if(fetchData.productImage){
        let path="../frontend/public/productImages/"+fetchData.productImage
        await fs.unlinkSync(path)
    }
    await NewProduct.findOneAndDelete({_id:req.params.pid})
    res.status(200).json("Product has been deleted!")
})


app.put('/:pid',async(req,res)=>{
let fetchData=await NewProduct.findOne({_id:req.params.pid})
if(!fetchData) return res.status(201).json('Something went wrong!')
    if(fetchData.productImage!==req.body.productImage){
        let path="../frontend/public/productImages/"+fetchData.productImage
         await fs.unlinkSync(path)
    }
await NewProduct.findByIdAndUpdate({_id:req.params.pid},{...req.body})
res.status(200).json('Product has been updated!')
// console.log(fetchData)
})


//login 

app.post('/login',(req,res)=>{
    let username=req.body.username.toString()
    let companyId=req.body.companyId.toString()
    if(username==="abc"){
        if(companyId==="abc123"){
            res.status(201).json(1)
        }else{
            res.status(201).json('ID')
        }
    }else{
        res.status(201).json(0)
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/public/productImages')
    },
    filename: function (req, file, cb) {
        cb(null,req.body.name)
    }
})

const upload = multer({ storage: storage })

app.use('/uploadProductImage',upload.single('file'),function (req, res) {
    res.status(200).json("file has been uploaded!")
})

app.use('/uploadedImages',express.static('../frontend/public/productImages'))

app.listen(PORT, () => {
    connect()
    console.log(`Server is running on port no ${PORT}`)
})