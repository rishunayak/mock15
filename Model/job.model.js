const mongoose=require("mongoose")


const jobSchema=mongoose.Schema({
    cname:{type:String},
    postion:{type:String},
    contract:{type:String},
    location:{type:String}
})

const Job=mongoose.model("jobs",jobSchema)

module.exports=Job