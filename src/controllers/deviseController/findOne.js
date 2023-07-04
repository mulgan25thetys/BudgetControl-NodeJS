const { Devise, Capital } = require('../../config/database/database')

module.exports = async (req, res) => {
    try {
        const defaultDevise = await Devise.findOne({
            where: { id: require('../../config/utils/getSearchId')(req.params.id) }, include : [Capital]
        })

        require('../../config/utils/returnOneData')(res, 'devise', defaultDevise)
    } catch (error) {
        require('../../config/utils/catchError')
    }
}