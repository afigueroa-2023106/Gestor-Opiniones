'use strict'
import {Router} from 'express'
import {validateJwt} from '../middleware/validate.jwt.js'
import {createComment, deleteComment, getComments, updateComment} from './comment.controller.js'

const api = Router()

api.post('/createComment', [validateJwt], createComment)
api.get('/getComments', [validateJwt], getComments)
api.put('/updateComment/:id', [validateJwt], updateComment)
api.delete('/deleteComment/:id', [validateJwt], deleteComment) 

export default api 