const User = require('../models/users.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const requireLogin = async(req, res, next) => {
    let token
    if(req?.headers?.authorization?.startsWith('Bearer')) {
        token = req?.headers?.authorization.split(' ')[1]
        try {
            if(token) {
                const decodedJwt = jwt.verify(token, process.env.JWT_SECRET)
                req.user = await User.findById(decodedJwt?.id)
                next()
            }
        } catch(err) {
            res.status(401).json({msg: 'Not authorized!'})
        }
    } else {
        res.status(401).json({ msg: 'No headers specified' })
    }
}


module.exports = requireLogin

















// const requireLogin = async (req, res, next) => {
//     let token
//     if(req?.headers?.authorization?.startsWith('Bearer')) {
//         token = req?.headers?.authorization?.split(' ')[1]
//         try {
//             if(token) {
//                 const decodedJwt = jwt.verify(token, process.env.JWT_SECRET)
//                 req.user = await User.findById(decodedJwt?.id)
//                 next()
//             }
//         } catch(err) {
//             res.status(401).json({msg: 'Not authorized!'})
//         }
//     } else {
//         res.status(401).json({msg: 'No authorization header found!'})
//     }
// }