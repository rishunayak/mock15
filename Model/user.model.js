const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    name:String,
    email:{type:String,required:true},
    password:{type:String,required:true},
    isAdmin:Boolean
})

const User=mongoose.model("users",userSchema)

module.exports=User