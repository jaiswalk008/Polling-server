import { Response } from "express";
import Comment from "../Models/Comment"

export const createComment = async (req:any , res:Response)=>{
    try{
        const newComment  = new Comment({...req.body , userId:req.user._id});
        console.log(req.body)
        await newComment.save();
        return res.json(newComment);
    }
    catch(err){
        console.log(err)
    }
}
export const getComments = async (req:any, res:Response)=>{
    try{
        const comments = await Comment.find({postId:req.params.postId}).sort({createdAt:-1});
        return res.json(comments);
    }
    catch(err){
        console.log(err)
    }
}