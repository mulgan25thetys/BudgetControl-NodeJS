const { Capital, Devise } = require('../../config/database/database')

module.exports = async (req, res) => {
    return require('../../config/utils/returnListOfDatas')(req, res, 'Capital', await Capital.findAll({include: [Devise], order: [['id', 'DESC']]}), false)
}