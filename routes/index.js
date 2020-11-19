const router = require('express').Router()
const Controller = require('../controllers/controller')

const isLogIn = (req, res, next) => {
    if(req.session.userId){
        next()
    } else{
        res.redirect('/login')
    }
}

router.get('/', Controller.home)

router.get('/login', Controller.logIn)
router.post('/login', Controller.cekLogIn)

router.get('/register', Controller.register)
router.post('/register', Controller.addUser)

router.use(isLogIn)

router.get('/logout', Controller.logOut)

module.exports = router