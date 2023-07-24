const { UniqueConstraintError, ValidationError } = require('sequelize')
const { UserModel } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'ma_clé_secrète'

exports.signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const dataUser = { ...req.body, password: hash }
            return UserModel
                .create(dataUser)
                .then(result => {
                    res.status(201).json({ message: 'Un utilisateur a bien été créé.', data: { ...result, password: 'hidden' } })
                })
        })
        .catch(error => {
            if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: error })
        })
}

exports.login = (req, res) => {
    UserModel.findOne({ where: { username: req.body.username } })
        .then(user => {
            if (!user)
                return res.status(404).json({ message: `L'utilisateur n'existe pas` })
            bcrypt.compare(req.body.password, user.password)
                .then(isValid => {
                    if (isValid) {
                        const token = jwt.sign({
                            data: req.body.username
                        }, SECRET_KEY, { expiresIn: 60 * 60 });

                        res.json({ message: 'login réussi', data: token })
                    } else {
                        return res.json({ message: `Le mot de passe n'est pas correct` })
                    }
                })
        })
        .catch(error => {
            return res.status(500).json({ message: error.message })
        })
}

exports.protect = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: `Vous n'êtes pas authentifié` })
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY)
            req.username = decoded.data
            next()
        } catch (error) {
            res.status(403).json({ message: `Le jeton n'est pas valide` })
        }
    } else {
        res.status(401).json({ message: `Vous n'êtes pas authentifié.` })
    }
}

exports.restrictTo = (roleParram) => {
    return (req, res, next) => {
        res.json({ message: `On passe bien par un restritTo avec le ${roleParam}` })
    }
}