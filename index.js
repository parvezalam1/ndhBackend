import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
// import multer from 'multer';
import NewProduct from './model/NewProduct.js';
import fs from 'fs'
import ImageKit from 'imagekit';
dotenv.config()
let app = express();
let PORT = process.env.PORT || 3032;
app.use(cors())
app.use(express.json())



const imagekit = new ImageKit({
  urlEndpoint: 'https://ik.imagekit.io/c9ufptlb9',
  publicKey: 'public_7RFZgYOyot8n5BfxVPlwgnV/kws=',
  privateKey: 'private_FSIzRJ6Dv4WNXZwchWKf+J3riT0='
});

// allow cross-origin requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/auth', function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});






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
    // if(fetchData.productImage){
    //     let path="../frontend/public/productImages/"+fetchData.productImage
    //     await fs.unlinkSync(path)
    // }
    await NewProduct.findOneAndDelete({_id:req.params.pid})
    res.status(200).json("Product has been deleted!")
})


app.put('/:pid',async(req,res)=>{
let fetchData=await NewProduct.findOne({_id:req.params.pid})

if(!fetchData) return res.status(201).json('Something went wrong!')
await NewProduct.findByIdAndUpdate({_id:req.params.pid},{...req.body})
res.status(200).json('Product has been updated!')
// if(fetchData.productImage!==req.body.productImage){
//     let path="../frontend/public/productImages/"+fetchData.productImage
//      await fs.unlinkSync(path)
// }
// console.log(fetchData)
})


//login 

app.post('/login',(req,res)=>{
    let username=req.body.username.toString()
    let companyId=req.body.companyId.toString()
    if(username==="ndh"){
        if(companyId==="ndh"){
            res.status(201).json(1)
        }else{
            res.status(201).json('ID')
        }
    }else{
        res.status(201).json(0)
    }
})

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../frontend/public/productImages')
//     },
//     filename: function (req, file, cb) {
//         cb(null,req.body.name)
//     }
// })

// const upload = multer({ storage: storage })

// app.use('/uploadProductImage',upload.single('file'),function (req, res) {
//     res.status(200).json("file has been uploaded!")
// })

// app.use('/uploadedImages',express.static('../frontend/public/productImages'))

app.listen(PORT, () => {
    connect()
    console.log(`Server is running on port no ${PORT}`)
})