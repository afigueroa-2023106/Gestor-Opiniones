'use strict'
import {Schema, model} from 'mongoose'

const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    text:{
        type: String,
        required: true
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

export default model('post', postSchema) 