const { Op } = require('sequelize')
const { Economie, Devise } = require('../../config/database/database')

module.exports = async (req, res) => {
    const value = req.query.value
    let datas = []
    if (value) {
        datas = await Economie.findAll({
        where: {
            [Op.or]: [
                { description: { [Op.like]: `%${value}%` } },
                { amount: { [Op.like]: `%${parseFloat(value) || 0}%` } }
            ]
            },
            include: [Devise],
        order: [['updatedAt', 'DESC']]
    })
    } else {
        datas = await Economie.findAll({ order: [['updatedAt', 'DESC']] })
    }

    require('../../config/utils/returnListOfDatas')(req, res, 'economie', datas, true)
}