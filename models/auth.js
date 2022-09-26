import mongoose from "mongoose";


const authSchema = new mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId, 

    email:String,
    password:String,

})

const Auth = mongoose.model('Auth',authSchema)

export default Auth;