const { Devise } = require('../../config/database/database')

module.exports = async (req, res) => {
    const deletedDevise = await Devise.findOne({ where: { id: require('../../config/utils/getSearchId')(req.params.id) } })

    if (!deletedDevise) {
        return res.status(404).json({ message: require('../../config/utils/getNotFoundMessageOfModule')('devise'), data: deletedDevise })
    } else {
        Devise.destroy({ where: { id: deletedDevise.id } }).then(() => {
            return res.status(200).json({ message: require('../../config/utils/getDeleteMessage')('Devise : ' + deletedDevise.currency) })
        }).catch(err => {
            require('../../config/utils/catchError')(res, err)
        })
    }
}