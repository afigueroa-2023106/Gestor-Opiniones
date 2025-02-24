'use strict'

import { Schema, model } from "mongoose"

const commentSchema = new Schema ({
    text: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

export default model ('comment', commentSchema)
