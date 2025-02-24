'use strict'
import Category from './category.model.js'
import Publication from '../post/post.model.js'
import { checkUpdate } from '../utils/validator.js' 

export const addCategory = async (req, res) => {
    try {
        let data = req.body
        let category = await Category(data)
        category = await category.save()
        return res.status(200).send({message: 'Your category has been created.'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error creating the category' })
    }
}
export const getCategories= async(req,res)=>{
    let categories = await Category.find()
    return res.send(categories)
}
export const updateCategory = async(req, res)=>{
    try {
        let {id} = req.params
        let data = req.body
        let category = await Category.findOne({_id: id})
        if (!category) return res.status(404).send({message: 'Category not found'})
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be update or missing' })
        let updatedCategory = await Category.updateOne(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedCategory) return res.status(404).send({message: 'Category has not been updated.'})
        return res.status(200).send({message: 'Category updated successfully.'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating the comment' })
    }
}
export const deleteCategory = async(req, res)=>{
    try{
        let {id} = req.params
        let posts = await Publication.find({category: id})
        console.log(posts)
        for(let post of posts){
            if(post.category._id == id) return res.status(400).send({message: 'You cannot delete this category because it has posts.'})
        }
        let deletedPost = await Category.findByIdAndDelete({_id: id})
        if(!deletedPost) return res.status(404).send({message: 'The category is not found'})
        return res.status(200).send({message: 'The category has been deleted successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Category has not been deleted'})
    }
}

