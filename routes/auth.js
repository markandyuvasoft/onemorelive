import express from 'express'
import mongoose from 'mongoose'
import * as path from 'path'
import bcrypt from 'bcrypt'
import  Jwt  from 'jsonwebtoken'
import _ from 'lodash';
import checkAuth from '../middleware/check-auth.js'
import Auth from '../models/auth.js'
import Book from '../models/book.js'


const authrouter=express.Router()


//....................................USER REGISTER START.............................................................................................

authrouter.post("/register", async (req, res) => {

    const { name, email, password, } = req.body;
  
    if (
      !name || !email || !password 
      
    ) {
      return res.status(422).json({ error: " plzz filled the field propraly" });
    } 
    try {
      const userExist =await  Auth.findOne({ email: email });
  
      if (userExist) {
        return res.status(422).json({ error: "email already exist" });
      }  else {
        const hash=await bcrypt.hash(password,10)

        const user = new Auth({
            name:name,
            email:email,
            password:hash,
        });
  
        // const userRegister =
        const userRegister = await user.save();
  
        res.status(201).json({ message: "user register successfully" });
      }
    } catch (err) {
      console.log(err);
    }

  });

//....................................USER REGISTER END.............................................................................................
  

//.................USER LOGIN START.................................................................................................................
// authrouter.post('/login',(req,res,next)=>{


// const {email,password}=req.body;
// if(!email||!password){
//     res.send("plzz fill the data")
// } else{
//     Auth.find({email:req.body.email})
    
//     .exec()
//     .then(user=>{

//         if(user.length < 1)
//         {
//             return res.status(401).json({
//                 msg: 'user not found'
//             })
//         }
//         bcrypt.compare(req.body.password,user[0].password,(err,result)=>{

//             if(!result)
//             {
//            return res.status(401).json({
//                     msg: 'not match'
//                 })
//             }
//             if(result)
//             {
//                 const token = Jwt.sign({

//                 email:user[0].email,
                
//             },
//                 'i am markand',
//                 {
//                     expiresIn:"24h"
//                 }
//                 )
//                 res.status(200).json({

//                     token:token
//                 })
//             }
//         })
//     })
//     .catch(err=>{
//         res.status(500).json({
//             err:err
//         })
//     })
// }
// })


authrouter.post('/login',(req,res,next)=>{

    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    Auth.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
               const token = Jwt.sign({_id:savedUser._id},"i am markand")
               const {_id,name,email} = savedUser
               res.send({token,user:{_id,name,email}})
            }
            else{
                return res.status(422).send({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
//.................USER LOGIN END.................................................................................................................


//SEARCH PAGINATION LIMIT START....................................................................................................................
authrouter.get("/search",async(req,res,next)=>{

    try{

        const {page=1, limit=150 ,sort,search=""}=req.query;

        const data= await Book.find({name:{$regex: search, $options: "i" }})         

        .sort({[sort]:1})        // sorting name, id ,etc

        .limit(limit * 1)       // apply limit to show data

        .skip((page-1) * limit)     // pagination formula

        res.send({page:page, limit:limit, data:data})

        const total = await Book.countDocuments({
        
        name:{ $regex: search, $options: "i" }   // search name according
            
    });
    }catch (error) {

    console.log(error)

    res.status(500).json({

    error:error
        })
    }
})

//SEARCH PAGINATION LIMIT END....................................................................................................................
export default authrouter;