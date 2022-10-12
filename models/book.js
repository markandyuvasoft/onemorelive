// import mongoose from "mongoose";


// const bookSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         unique:true,
  
    
//         },
//     age:{
//         type:Number,
      
//         },
//     city:{
//         type:String,
//         },
// })

// const Book=mongoose.model('node',bookSchema)
// export default Book

import mongoose from "mongoose";
const {ObjectId}= mongoose.Schema.Types

const bookSchema=new mongoose.Schema({

    name:{
        type:String,
        unique:true,
  
    
        },
    age:{
        type:Number,
      
        },
    city:{
        type:String,
        },
    postedby:{
        type:ObjectId,
        ref:"Auth"
            },
})

const Book=mongoose.model('node',bookSchema)
export default Book