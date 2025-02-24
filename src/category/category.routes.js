'use strict'
import {Router} from 'express'
import {validateJwt} from '../middleware/validate.jwt.js'
import {addCategory,getCategories,updateCategory,deleteCategory} from './category.controller.js'

const api = Router()

api.post('/addCategory', [validateJwt], addCategory)
api.get('/getCategories', [validateJwt], getCategories)
api.put('/updateCategory/:id', [validateJwt], updateCategory)
api.delete('/deleteCategory/:id',[validateJwt], deleteCategory)

export default api