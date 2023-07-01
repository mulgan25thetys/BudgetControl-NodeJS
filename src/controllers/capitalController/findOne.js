const { Devise, Capital } = require('../../config/database/database')

module.exports = async (req, res) => {
    try {
        const defaultCapital = await Capital.findOne({
            where: { id: require('../../config/utils/getSearchId')(req.params.id) },
            include: [Devise]
        })

        require('../../config/utils/returnOneData')(res, 'capital', defaultCapital)
    } catch (error) {
        require('../../config/utils/catchError')
    }
}