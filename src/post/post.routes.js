'use strict'
import {Router} from 'express'
import {createPost, deletePost, getPosts, updatePost}from './post.controller.js'
import { validateJwt } from '../middleware/validate.jwt.js'

const api = Router()

api.post('/createPost', [validateJwt], createPost )
api.get('/getPosts', [validateJwt], getPosts)
api.put('/updatePost/:id', [validateJwt], updatePost )
api.delete('/deletePost/:id', [validateJwt], deletePost)
export default api