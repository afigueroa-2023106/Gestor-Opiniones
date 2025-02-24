'use strict'
import Comment from '../comment/comment.model.js'
import Publication from './post.model.js'
import { checkUpdate } from '../utils/validator.js'

export const createPost = async (req, res) => {
    try {
        let { _id } = req.user
        let data = req.body
        if (!_id) return res.status(404).send({ message: 'User not found.' })
        data.author = _id
        let publication = await Publication(data)
        publication = await publication.save()
        return res.status(200).send({ message: 'Your publication has been posted' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error creating publication' })
    }
}
export const getPosts = async (req, res) => {
    try {
        const posts = await Publication.find().populate('author', ['name', 'email', '-_id']).populate('category', ['title', '-_id'])
        return res.send(posts)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting the posts' })
    }
}

export const updatePost = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        let post = await Publication.findOne({ _id: id })
        if (!post) return res.status(404).send({ message: 'Post not found' })
        if (post.author.toString() !== req.user._id.toString()) return res.status(401).send({ message: 'Unauthorized' })
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be update or missing' })
        let updatedPost = await Publication.updateOne(
            { _id: id },
            data,
            { new: true }
        ).populate('author', ['name', 'email'])
        if (!updatedPost) return res.status(404).send({ message: 'Publication has not been updated.' })
        return res.status(200).send({ message: 'The publication has been updated successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating the posts.' })
    }
}
export const deletePost = async (req, res) => {
    try {
        let { id } = req.params
        let { _id } = req.user._id
        let post = await Publication.findOne({ _id: id })
        if (post.author._id.toString() !== _id.toString()) return res.status(200).send({ message: 'Unauthorized. You cannot delete the publication of others.' })
        let commentsDeleted = await Comment.find({ publication: post._id })
        for (let comment of commentsDeleted) {
            await Comment.findByIdAndDelete({ _id: comment._id })
        }
        let deletedPost = await Publication.findByIdAndDelete({ _id: id })
        if (!deletedPost) return res.status(400).send({ message: 'Post has not been deleted' })
        return res.status(200).send({ message: 'The post has been deleted successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting the post.' })
    }
}