const { Devise } = require('../../config/database/database')

module.exports = async (req, res) => {
    try {
        require('../../config/utils/returnListOfDatas')(req, res, 'Devise', await Devise.findAll(), false)
    } catch (error) {
        require('../../config/utils/catchError')(res, error)
    }
}