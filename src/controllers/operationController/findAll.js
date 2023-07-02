const { Op } = require('sequelize')
const { Operation, Devise, Files } = require('../../config/database/database')

module.exports = async (req, res) => {
    const value = req.query.value
    let datas = []
    if (value) {
        datas = await Operation.findAll({
        where: {
            [Op.or]: [
                { object: { [Op.like]: `%${value}%` } },
                { description: { [Op.like]: `%${value}%` } },
                { amount: { [Op.like]: `%${parseFloat(value) || 0}%` } },
                { category: { [Op.like]: `%${value}%` } },
            ]
            },
            include: [Files, Devise],
        order: [['updatedAt', 'DESC']]
    })
    } else {
        datas = await Operation.findAll({ order: [['updatedAt', 'DESC']] })
    }

    require('../../config/utils/returnListOfDatas')(req, res, 'operation', datas, true)
}