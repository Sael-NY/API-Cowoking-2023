const { UniqueConstraintError, ValidationError } = require('sequelize')
const { CoworkingModel } = require('../db/sequelize')

exports.findAllCoworkings = (req, res) => {
    CoworkingModel
        .findAll()
        .then(result => {
            res.json({ message: 'La liste des coworkings a bien été récupérée.', data: result })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })
}

exports.findCoworkingByPk = (req, res) => {
    CoworkingModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404).json({ message: `L'élément ayant pour id ${req.params.id} n'existe pas.` })
            } else {
                res.json({ message: `L'élément a bien été récupéré.`, data: result })
            }
        })
        .catch(error => {
            res.status(500).json({ message: `Une erreur est survenue : ${error}` })
        })
}

exports.createCoworking = (req, res) => {
    const newCoworking = req.body
    CoworkingModel
        .create({
            name: newCoworking.name,
            price: newCoworking.price,
            superficy: newCoworking.superficy,
            capacity: newCoworking.capacity,
            address: newCoworking.address
        })
        .then((result) => {
            res.status(201).json({ message: 'Un coworking a bien été ajouté.', data: result })
        })
        .catch((error) => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: `Une erreur est survenue :  ${error}` })
        })
}

exports.updateCoworking = (req, res) => {
    CoworkingModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                //throw new Error('Aucun coworking trouvé')
                res.status(404).json({ message: 'Aucun coworking trouvé' })
            } else {
                return result
                    .update(req.body)
                    .then(() => {
                        res.json({ message: `Coworking modifié : ${result.dataValues.id} `, data: result })
                    })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: error.message })
        })
}
exports.deleteCoworking = (req, res) => {
    CoworkingModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                //throw new Error('Aucun coworking trouvé')
                res.status(404).json({ message: 'Aucun coworking trouvé' })
            } else {
                return result
                    .destroy()
                    .then(() => {
                        res.json({ message: `Coworking supprimé : ${result.dataValues.id} `, data: result })
                    })
            }
        })
        .catch(error => {
            res.status(500).json({ message: `${error}` })
        })
}