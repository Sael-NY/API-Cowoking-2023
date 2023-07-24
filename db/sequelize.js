const { Sequelize, DataTypes } = require('sequelize');
const mockCoworkings = require('./mock_coworkings')
const bcrypt = require('bcrypt')
const roles = ['user', 'editor', 'admin']

const sequelize = new Sequelize('coworking_paul', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.log(`Impossible de se connecter à la base de données ${error}`))

const defineCoworkingModel = require('../models/coworkingModel')
const defineUserModel = require('../models/userModel')
const defineRoleModel = require('../models/roleModel')
const CoworkingModel = defineCoworkingModel(sequelize, DataTypes)
const UserModel = defineUserModel(sequelize, DataTypes)
const RoleModel = defineRoleModel(sequelize, DataTypes)

const initDb = () => {
    sequelize
        .sync({ force: true })
        .then(() => {
            mockCoworkings.forEach(mock => {
                CoworkingModel.create({
                    name: mock.name,
                    price: mock.price,
                    superficy: mock.superficy,
                    capacity: mock.capacity,
                    address: mock.address
                });
            })
            bcrypt.hash('mdp', 10)
                .then(hash => {
                    UserModel.create({
                        username: 'Jean',
                        password: hash
                    })
                })
            const rolePromises = roles.map(role => {
                return RoleModel.create({
                    label: role
                })
            })
            Promise.all(rolePromises).then(() => {
                RoleModel.findOne({ where: { label: 'editor' } })
                    .then(role => {
                        bcrypt.hash('mdp', 10)
                            .then(hash => {
                                UserModel.create({
                                    username: 'Simon',
                                    password: hash,
                                    RoleId: role.id
                                })
                            })
                    })
                RoleModel.findOne({ where: { label: 'admin' } })
                    .then(role => {
                        bcrypt.hash('mdp', 10)
                            .then(hash => {
                                UserModel.create({
                                    username: 'Pierre',
                                    password: hash,
                                    RoleId: role.id
                                })
                            })
                    })
            })
        })
}

module.exports = {
    initDb, CoworkingModel, UserModel, RoleModel
}