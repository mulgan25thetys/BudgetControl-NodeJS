const { Op } = require('sequelize')
const { Devise } = require('../../config/database/database')

module.exports = async (req, res) => {
    const value = req.query.value
    try {
        let devisesData = []
        if (value) {
            devisesData = await Devise.findAll({
                where: {
                    [Op.or]: [
                        { currency: { [Op.like]: `%${value}%` } },
                        { region: { [Op.like]: `%${value}%` } },
                    ]
                },
                order:  [['updatedAt','DESC']]
            })
        } else {
            devisesData = await Devise.findAll({ order:  [['updatedAt','DESC']]})
        }
        require('../../config/utils/returnListOfDatas')(req, res, 'Devise', devisesData, true)
    } catch (error) {
        require('../../config/utils/catchError')(res, error)
    }
}