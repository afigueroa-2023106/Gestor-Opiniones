'use strict'
import Comment from './comment.model.js'
import { checkUpdate } from '../utils/validator.js' 

 export const createComment = async(req, res) =>{
    try {
        let {_id} = req.user
        let data = req.body
        if(!_id) return res.status(404).send({message: 'User not found.'})
        data.author = _id
        let comment = await Comment(data)
        comment = await comment.save()
        return res.status(200).send({message: 'Your comment has been posted'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error creating the comment' })
    }
}
export const getComments = async(req, res)=>{
    try {
        let comments = await Comment.find().populate('author', ['name', 'email', '-_id']).populate('post', ['title', '-_id'])
        return res.send(comments)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting the comments' })
    }
}
export const updateComment = async(req,res)=>{
    try {
        let {id} = req.params
        let {_id} = req.user
        let data = req.body
        let comment = await Comment.findOne({_id: id})
        if (!comment) return res.status(404).send({message: 'Comment not found'})
        if(!_id) return res.status(404).send({message: 'User not found.'})
        if(comment.author.toString()!== _id.toString()) return res.status(404).send({message: 'You are not the author of this comment'})
        if(data.publication != null) return res.status(400).send({message: 'You cannot update or change the publication commented.'})
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be update or missing' })
        let updatedComment = await Comment.updateOne(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedComment) return res.status(404).send({message: 'Publication has not been updated.'})
        return res.status(200).send({message: 'Comment updated successfully.'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating the comment' })
    }
}
export const deleteComment = async(req, res)=>{
    try {
        let {_id} = req.user
        let {id} = req.params
        if(!_id) return res.status(404).send({message: 'User not found.'})
        let comment = await Comment.findOne({_id: id})
        if(!comment) return res.status(404).send({message: 'Comment not found.'})
        if(comment.author._id.toString() !== _id.toString()) return res.status(404).send({message: 'You are not the author of this comment'})
        let deletedComment = await Comment.findByIdAndDelete({_id: id})
        if(!deletedComment) return res.status(404).send({message: 'Comment has not been deleted.'})
        return res.status(200).send({message: 'Comment deleted successfully.'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting the comment' })
    }
} 