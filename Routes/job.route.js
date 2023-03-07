const express=require("express")

const app=express.Router()

const Authentication = require("../Middleware/Authentication")
const Job = require("../Model/job.model")


app.get("/",async(req,res)=>
{
    const {contract,search}=req.query

    try
    {

        if(contract && search)
        {
            let data=await Job.find({contract:contract,cname:{$regex:search}})
            res.send(data)
        }
        else if(contract)
        {
            let data=await Job.find({contract:contract})
            res.send(data)
        }
        else if(search)
        {
            let data=await Job.find({cname:{$regex:search}})
            res.send(data)
        }
        else
        {
            let data=await Job.find()
            res.send(data)
        }

       
    }
    catch(e)
    {
        res.send(e)
    }
})

//app.use(Authentication)

app.post("/",async(req,res)=>
{
   
    try
    {
        await Job.create({...req.body})
        res.send({msg:"Posted Successfully"})
    }
    catch(e)
    {
        res.send(e)
    }
})

app.patch("/:id",async(req,res)=>
{
    const {id}=req.params
    
    try
    {
        await Job.findByIdAndUpdate({_id:id},req.body)
        res.send({msg:"Updated Successfully"})
    }
    catch(e)
    {
        res.send(e)
    }
})


app.delete("/:id",async(req,res)=>
{
    const {id}=req.params
    
    try
    {
        await Job.findByIdAndDelete({_id:id})
        res.send({msg:"Deleted Successfully"})
    }
    catch(e)
    {
        res.send(e)
    }
})



module.exports=app

