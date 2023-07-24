const express = require('express')
const morgan = require('morgan')
const sequelize = require('./db/sequelize')
const app = express()
const port = 3001

sequelize.initDb()

app.use(morgan('dev'))
app.use(express.json())

const coworkingRouter = require('./routes/coworkingRoutes')
const userRouter = require('./routes/userRoutes')

app.use('/api/coworkings', coworkingRouter)
app.use('/api/users', userRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})