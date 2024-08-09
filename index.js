const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const dotEnv=require('dotenv')
const app=express()
dotEnv.config()
const port=process.env.PORT || 3000;

app.use(express.urlencoded({extended:false}))

//backEnd

const userSchema= mongoose.Schema({
 Name:{
    type:String,
    require:true
 },
 Email:{
    type:String,
    require:true,
    unique:true,
 } ,
 Password:{
    type:String,
    require:true
 }  
})
const User=mongoose.model('RegisterPage',userSchema)
mongoose.connect("mongodb+srv://anuraggupta2993:Anurag%401612@cluster0.jcrv6rl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log('mongoose connected succesfully')).catch((err)=>console.log(err))


app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:'./pages'})
})

app.post('/register',async(req,res)=>{

    const user=await User.findOne({Email:req.body.email})
    console.log(user)
    if(user)
        {
            res.sendFile('error.html',{root:'./pages'})
        }
        else{
            const result=await User.create({
                Name:req.body.name,
                Email:req.body.email,
                Password:req.body.password
               })
               res.sendFile('success.html',{root:'./pages'}) 
        }
    // const result=await User.create({
    //  Name:req.body.name,
    //  Email:req.body.email,
    //  Password:req.body.password
    // })
//    if(req.body.name==''&&req.body.email==''&&req.body.password==''){
//     res.sendFile('error.html',{root:'./pages'})
//    }
//    else{
//     res.sendFile('success.html',{root:'./pages'})
//    }
})
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})