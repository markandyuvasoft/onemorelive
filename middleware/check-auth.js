// import express from 'express'
// import  Jwt  from 'jsonwebtoken'
// import authrouter from '../routes/auth.js'

// const checkauth=(req,res,next)=>{
    
//     try{
// const token= req.headers.authorization.split(" ")[1]
// //  console.log(token)
// const verify = Jwt.verify(token,'i am markand')


// next()

//     }
//     catch(error)
//     {
//         return res.status(401).json({
//             msg: 'only access authorised person'
//         })
//     }
// } 
// export default checkauth;




import  Jwt  from 'jsonwebtoken'
import mongoose from 'mongoose'
import Auth from "../models/auth.js"

const auth = (req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    Jwt.verify(token,"i am markand",(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
         Auth.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
        
        
    })
}
export default auth

