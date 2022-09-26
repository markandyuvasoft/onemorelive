import mongoose from "mongoose";


const authSchema = new mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId, 

    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        },

})

const Auth = mongoose.model('Auth',authSchema)

export default Auth;