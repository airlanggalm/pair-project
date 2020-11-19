const {
    User,
    Toy,
    UserCart
} = require('../models/index')
const {
    comparePw
} = require('../helper/password')

class Controller {
    static home(req, res) {
        let userId = req.session.userId
        let name = req.session.name
        res.render('home.ejs', {
            userId, name
        })
    }

    static logIn(req, res) {
        res.render('login')
    }

    static register(req, res) {
        res.render('register')
    }

    static addUser(req, res) {
        // console.log(req.body);
        let userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(userData)
            .then(_ => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err.message)
            })
    }

    static cekLogIn(req, res) {
        const email = req.body.email
        const password = req.body.password

        User.findOne({
                where: {
                    email: email
                }
            })
            .then(user => {
                if (user && comparePw(password, user.password)) {
                    req.session.userId = user.id
                    req.session.name = user.name
                    res.redirect('/')
                } else {
                    res.send('invalid pw')
                }
            })
            .catch(err => {
                res.send(err.message)
            })
    }

    static logOut(req, res) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                // req.end();
                res.redirect('/');
            }
        });
    }
}

module.exports = Controller