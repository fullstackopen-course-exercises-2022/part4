const UserRouter = require('express').Router()
const Users = require('../models/users.model')
const logger = require('../util/logger')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

UserRouter.post('/', async(req, res) => {
    try {
        const { name, username, dob, password } = req.body

        const findUser = await Users.findOne({ username })
        if(findUser) {
            return res.status(400).json({msg: 'Username already taken, Sorry!'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new Users({
            name,
            username,
            password: hashedPassword,
            dob
        })
        const savedUser = await user.save()
        res.status(201).json(savedUser)
        logger.info(savedUser)
    } catch(err) {
        logger.error(err)
        res.status(500).json({ msg: err })
    }
})

UserRouter.post('/auth', async(req, res) => {
    const { username, password } = req.body
    try {
        const user = await Users.findOne({ username })
        const userCheck = user === null ?
            false : await bcrypt.compare(password, user.password)

        if(!(user && userCheck)) {
            return res.status(400).json({ msg: 'Password and username mismatch!' })
        }

        const userInfo = {
           username: user.username,
            name: user.name,
            id: user._id
        }
        const token = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: 60 * 60 })

        res.status(200).send({token, userInfo})
    } catch(err) {
        logger.error(err)
        res.status(500).send(err)
    }
})

UserRouter.get('/', async (req, res) => {
    try {
        const users = await Users.find({}).populate('blog')
        res.json(users)
    } catch(err) {
        res.status(500).json({msg: err})
    }
})

module.exports = UserRouter