import mongoose from "mongoose";


const authSchema = new mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId, 

    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        unique:true,
        maxlength:10,
        minlength:5,
        trim:true,
        },

})

const Auth = mongoose.model('Auth',authSchema)

export default Auth;