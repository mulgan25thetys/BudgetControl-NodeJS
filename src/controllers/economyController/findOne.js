const { Devise, Economie } = require('../../config/database/database')

module.exports = async (req, res) => {
    try {
        const defaultEconomy = await Economie.findOne({
            where: { id: require('../../config/utils/getSearchId')(req.params.id) },
            include: [Devise]
        })

        require('../../config/utils/returnOneData')(res, 'economy', defaultEconomy)
    } catch (error) {
        require('../../config/utils/catchError')
    }
}