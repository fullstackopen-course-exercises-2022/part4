const { error } = require('../util/logger')

const errorHandler = (err, req, res, next) => {
    error(err.message)
    if(err.name === 'CastError') {
        return res.status(422).json({ msg: 'Malformed Id.' })
    } else if(err.name === 'ValidationError') {
        return res.status(400).json({ msg: err.message })
    }
    next(err);
}

module.exports = { errorHandler }