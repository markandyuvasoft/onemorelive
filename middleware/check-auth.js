import express from 'express'
import  Jwt  from 'jsonwebtoken'
import authrouter from '../routes/auth.js'

const checkauth=(req,res,next)=>{
    
    try{
const token= req.headers.authorization.split(" ")[1]
//  console.log(token)
const verify = Jwt.verify(token,'i am markand')


next()

    }
    catch(error)
    {
        return res.status(401).json({
            msg: 'only access authorised person'
        })
    }
} 
export default checkauth;