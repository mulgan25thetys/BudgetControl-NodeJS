const { Economie } = require('../../config/database/database')

module.exports = async (req, res) => {
    const existedEconomy = await Economie.findOne({ where: { id: require('../../config/utils/getSearchId')(req.params.id) } })

    if (existedEconomy) {
        try {
            await Economie.destroy({ where: { id: existedEconomy.id } })
            const isUpdatedCapital = await require('../capitalController/update')(existedEconomy.amount)

            if (isUpdatedCapital) {
                return res.status(200).json({ message: require('../../config/utils/getDeleteMessage')('Economy: '+existedEconomy.description), data: existedEconomy })
            } else {
                return res.status(500).json({ message: require('../../config/utils/getOccuredErrorMessage') })
            }
        }catch(err ) {
            require('../../config/utils/catchError')(res, err)
        }
    } else {
        return res.status(404).json({ message: require('../../config/utils/getNotFoundMessageOfModule')('economy'), data: existedEconomy })
    }
}