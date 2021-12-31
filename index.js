const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const userRoute=require("./routes/user")
const authRoute=require("./routes/auth")

dotenv.config() 

app.use(express.json())


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Db connection Succesful")}).catch(err=>{
        console.log(err)
    })


app.use("/api/users",userRoute)

app.use("/api/auth",authRoute)

app.listen(process.env.PORT || 5000,()=>{
    console.log('server running on 5000 port')
})