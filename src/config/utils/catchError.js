const { UniqueConstraintError, ValidationError } = require("sequelize")

module.exports = (res, err) => {
     const message = require('./getFilterErrorMessage')(err.message)

    if (err instanceof UniqueConstraintError) {
        return res.status(409).json({ message: message, data: err })
    }
    if (err instanceof ValidationError) {
        return res.status(400).json({ message: message, data: err })
    }

    return res.status(500).json({ message: message, data: err }) 
}