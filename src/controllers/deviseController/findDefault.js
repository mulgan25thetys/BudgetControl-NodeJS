const { Devise } = require('../../config/database/database')

module.exports = async (req, res) => {
    try {
        const defaultDevise = await Devise.findOne({
            where: { default: true }
        })
        
        require('../../config/utils/returnOneData')(res, 'Devise', defaultDevise)
    } catch (error) {
        require('../../config/utils/catchError')(res, error)
    }
}