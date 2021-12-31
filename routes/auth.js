const router=require("express").Router();
const User=require("../models/User")
const CryptoJs=require("crypto-js");
const cryptoJs = require("crypto-js");

//Register new user

router.post('/register',async(req,res)=>{

    const newUser= new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJs.AES.encrypt(req.body.password,process.env.SECRECT_KEY).toString()
    })
        try{

            const savedUser=await newUser.save()
            res.status(201).json(savedUser)
            console.log(savedUser)

        }catch(err){
            res.status(500).json(err)
        }
   
})


router.post('/login',async(req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        !user && res.status(401).json("Wrong Credentials") 

        const hashPassword=CryptoJs.AES.decrypt(user.password,process.env.SECRECT_KEY)
        const psswrd=hashPassword.toString(cryptoJs.enc.Utf8);


        psswrd!==req.body.password
            res.status(401).json("wrong details")
        
        res.status(200).json(user)

        console.log(user)
    }catch(err){
        console.log(err)
    }


})


module.exports=router;