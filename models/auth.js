import mongoose from "mongoose";


const authSchema = new mongoose.Schema({

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