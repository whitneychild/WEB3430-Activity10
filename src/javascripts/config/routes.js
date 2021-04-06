import express from 'express'

import {contactPage, aboutPage, indexPage} from '../controllers/index'
import { contactAPI } from '../controllers/contacts'
import {allMoviesAPI} from '../controllers/movies'
import {registerUserAPI, signUserInAPI} from '../controllers/users'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from './vars'

let router = express.Router()

function isSignedIn(req) {
    try{
        jwt.verify(req.cookies.token, APP_SECRET)
        return true
    }catch(err) {
        return false
    }
}


export function configureRoutes(app){
    app.all('*', (req, res, next) => {
        app.locals.signedIn = isSignedIn(req)
        next()
    })
    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)
    router.get('/movies*', indexPage)
    router.get('.register', indexPage)
    router.get('/signin', indexPage)

    router.get('/api/movies', allMoviesAPI)

    // Users
    router.post('/api/users/register', registerUserAPI)
    router.post('/api/users/signin', signUserInAPI)
    router.get('/api/contact', contactAPI)

    app.use('/', router)
}