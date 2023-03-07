const express=require("express")
const bcrypt=require("bcrypt")
const app=express.Router()
const jwt=require("jsonwebtoken")
const User = require("../Model/user.model")
const Authentication = require("../Middleware/Authentication")

app.post("/register",async(req,res)=>
{
    const {email,password}=req.body

    let check=email.split("@")

    if(check[1]=="masaischool.com")
    {
        req.body.isAdmin=true
    }


    try
    {
         const exist=await User.findOne({email:email})

         if(exist)
         {
            res.send("User Already Registered")
         }
         else
         {
            bcrypt.hash(password,5,async(err,hashPassword)=>
            {
                if(err)
                {
                    res.send(err)
                }
                else
                {
                    try
                    {
                        await User.create({...req.body,password:hashPassword})
                        res.send({msg:"Successfully Registered"})
                    }
                    catch(e)
                    {
                        res.send(e)
                    }
                }
            })
         }

    }
    catch(e)
    {
        res.send(e)
    }
})


app.post("/login",async(req,res)=>
{
    const {email,password}=req.body

    try
    {
        const exist=await User.findOne({email:email})

        if(exist)
        {
            bcrypt.compare(password,exist.password,function(err,result)
            {
                if(result)
                {
                    const token=jwt.sign({id:exist.id},"auth")
                    res.send({token:token,user:exist})
                }
                else
                {
                    res.send("Invalid Credentials")
                }
            })
           
        }
        else
        {
            res.send("Email doesn't Exist")
        }
    }
    catch(e)
    {
        res.send(e)
    }
})


app.use(Authentication)

app.get("/",async(req,res)=>
{
    const id=req.body.id

    try
    {
        const userData=await User.findOne({_id:id})
        res.send(userData)
    }
    catch(e)
    {
        res.send(e)
    }
})

app.patch("/:id",async(req,res)=>
{
    const id=req.params.id
    console.log(req.body)
    try
    {
        await User.findOneAndUpdate({_id:id},req.body)
        res.send({msg:"Updated Profile"})
    }
    catch(e)
    {
        res.send(e)
    }

})


module.exports=app