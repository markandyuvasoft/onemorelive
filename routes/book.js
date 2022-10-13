// import  express  from "express";
// import checkauth from "../middleware/check-auth.js";
// import Book from "../models/book.js";
// const router=express.Router()

// //post method start......................................
// router.post("/post",checkauth,(req,res,next)=>{

//     const { name, age, city, } = req.body;

//     if(!name || !age || !city)
//     {
//         res.send("plz fill the data")
//     } else{

//         const user = new Book(req.body)
      
//         user.save().then(()=>{
    
//         res.status(201).send(user)
    
//         }).catch((err)=>{
      
//         res.status(400).send(err)
    
//         }) 
//     }
//   })
// //post method end......................................


// router.get("/get/:id",async(req,res)=>{

//     try{
     
//         const _id= req.params.id

//      const getid= await Book.findById(_id)

//      res.status(201).send(getid)
//     }
//     catch(err)
//     {
//         res.status(400).send(err)
//     }
// })


// //get method start......................................
// router.get("/get",checkauth,async(req,res)=>{

//     try{

//     const get= await Book.find()

//     res.status(201).send(get)
//     }
//     catch(err)
//     {
//     res.status(400).send(err)
//     }
// })
// //get method end......................................

// //put method start......................................

// router.put("/update/:id",async(req,res)=>{

//     const { name, age, city, } = req.body;

//     if(!name || !age || !city)
//     {
//         res.send("plz fill the data")
//     }
// else{
    
//     try{
     
//         const _id= req.params.id

//      const getid= await Book.findByIdAndUpdate(_id,req.body,{
//         new:true
//      })

//      res.status(201).send(getid)
//     }
//     catch(err)
//     {
//         res.status(500).send(err)
//     }
// }
// })


// //put method end......................................

// //delete method start......................................
// router.delete("/delete/:id",checkauth,async(req,res)=>{

//         try{
//             const _id= req.params.id
    
//             const del= await Book.findByIdAndDelete(_id)

    
    
//             res.status(200).send({message: "your data is delete"})
//         }
//         catch(err)
//         {
//             res.status(500).send(err)
//         }
//     })
// //delete method end......................................
// export default router





import  express  from "express";
import Book from "../models/book.js";
import auth from "../middleware/check-auth.js";


const router=express.Router()

//post method start......................................
router.post("/post",auth,async(req,res,next)=>{

    const { name, age , city } = req.body;

    if(!name || !age ||!city )
    {
        res.status(400).send({error:"plz fill the data"})
    } else{

        req.user.password= undefined          // password ko show nhi krwane ke ley
        
        const user = new Book({
            name,age,city,postedby:req.user         //req.user me user login ki details hai
        })
        user.save().then(()=>{
    
        res.status(201).send(user)
    
        }).catch((err)=>{
      
        res.status(400).send(err)
    
        }) 
    }
  })
//post method end......................................


//get method start ONLY JIS USER NE POST KARA USKA DATA SHOW......................................
router.get("/get",auth,async(req,res)=>{

    Book.find({postedby:req.user._id})
    .populate("postedby", "_id name").then(mypost=>{
      
        res.send({mypost})
    }).catch(err=>{
        console.log("err");
    })

})

router.delete("/delete",auth,async(req,res)=>{

    Book.findOneAndDelete({postedby:req.user._id})
    .populate("postedby", "_id name").then(mypost=>{
      
        res.send("your data is delete")
    }).catch(err=>{
        console.log("err");
    })

})

router.get("/get/:id",async(req,res)=>{

    try{
     
        const _id= req.params.id

     const getid= await Book.findById(_id)

     res.status(201).send(getid)
    }
    catch(err)
    {
        res.status(400).send(err)
    }
})


export default router


