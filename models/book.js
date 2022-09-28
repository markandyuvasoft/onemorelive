import mongoose from "mongoose";


// book schema

const bookSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
  
    
        },
    age:{
        type:String,
      
        },
    city:{
        type:String,
        },
    
 
    
        
})

const Book=mongoose.model('node',bookSchema)
export default Book