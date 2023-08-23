import express from 'express';
import PostModel from '../models/PostModel.js';




export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 });
    res.status(200).json({ result: posts });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createpost = async (req, res) => { 
  const { title, description, username, selectedfile } = req.body;
  try {
    const result =await PostModel.create({title,description,username,selectedfile}); 
    res.status(200).json({ result: result });      
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
  }
};
export  const getpostsbyusername =async(req,res)=>{
  const {username}=req.params;
  try {
      const result = await PostModel.find({username:username}).sort({createdAt:-1});
      res.status(200).json({result:result});
  } catch (error) {
    res.status(500).json({message:"internal server error"});
  }
}
export const getpostdetails = async (req,res)=>{
  const {id}=req.params;
  try {
    const postdata= await PostModel.findById(id);
    if(postdata)
    {
      res.status(200).json({result:postdata});
    }
    else
    {
      res.status(404).json({message:"post not found"});
    }
  } catch (error) {
    console.log(error);
  }
}
export const likepost = async(req,res)=>{
  const id=req.params.id;
  // console.log(req.params)
  const {username}=req.body;
  // console.log(req.body)
  try {
    const post = await PostModel.findById(id);
    const likearray=post.likeCount;
    if(likearray.includes(username))
    {
      const updatedlist=likearray.filter((user)=>user!=username)
      await PostModel.updateOne({ _id: id }, { likeCount: updatedlist });

    }
    else
    {
      likearray.push(username);
      const updatedlist=likearray;

      await PostModel.updateOne({ _id: id }, { likeCount: updatedlist });
    }
    const postdata=await PostModel.findById(id);
    res.status(200).json({result:postdata});
    
  } catch (err)
  {
    res.status(500).json({message:"internal server error"});
  }
}

  
 
      
  
        
    