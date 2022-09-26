import express from 'express'
import mongoose from 'mongoose'
import * as path from 'path'
import bcrypt from 'bcrypt'
import  Jwt  from 'jsonwebtoken'
import checkAuth from '../middleware/check-auth.js'
import Auth from '../models/auth.js'


const authrouter=express.Router()


//....................................USER REGISTER START.............................................................................................
authrouter.post("/register",(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
    
        if(err)
        {
            return res.status(500).json({
                error:err
            })
        }
        else
        {
            const user= new Auth({
                _id: new mongoose.Types.ObjectId,
        
                email:req.body.email,
                password:hash,
                type:req.body.type,
                status:req.body.status
            })
            user.save()
            .then(result=>{
                res.status(200).json({
                    new_user:result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }
    })
    
    })
//....................................USER REGISTER END.............................................................................................
  

//.................USER LOGIN START.................................................................................................................
authrouter.post('/login',(req,res,next)=>{

    Auth.find({email:req.body.email})
    
    .exec()
    .then(user=>{

        if(user.length < 1)
        {
            return res.status(401).json({
                msg: 'user not found'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{

            if(!result)
            {
           return res.status(401).json({
                    msg: 'not match'
                })
            }
            if(result)
            {
                const token = Jwt.sign({

                email:user[0].email,
                
            },
                'i am markand',
                {
                    expiresIn:"24h"
                }
                )
                res.status(200).json({

                    token:token
                })
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})
//.................USER LOGIN END.................................................................................................................



export default authrouter;