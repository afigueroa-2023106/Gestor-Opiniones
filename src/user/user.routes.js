'use strict'
import {Router} from 'express'
import{ register,login,updateUser,updatePassword,getUser }from './user.controller.js'
import { validateJwt } from '../middleware/validate.jwt.js'

const api = Router()

api.post('/register', register)
api.post('/login', login)
api.get('/getUser',[validateJwt], getUser ) 
api.put('/update/:id',[validateJwt] , updateUser)
api.put('/updatePassword/:id',[validateJwt], updatePassword)


export default api