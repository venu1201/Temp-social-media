import express from 'express';
import multer from 'multer';
import gridfs from 'gridfs-stream';
import mongoose from 'mongoose';
import PostModel from '../models/PostModel.js';
const connection = mongoose.connection;
let gfs;
connection.once('open', () => {
  gfs = gridfs(connection.db, mongoose.mongo);
});

const upload = multer({ storage: multer.memoryStorage() });

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
  console.log(req.body)
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

  
 
      
  
        
    