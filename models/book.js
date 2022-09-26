import mongoose from "mongoose";


// book schema

const bookSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        lowercase:true,
        unique:true,
        trim:true,
    
        },
    age:{
        type:String,
        required:[true,"name is required"],
        },
    city:{
        type:String,
        required:[true,"city is required"],
        lowercase:true,
        trim:true,
        },
        
})

const Book=mongoose.model('node',bookSchema)
export default Book