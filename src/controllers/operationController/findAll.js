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
                { amount: { [Op.lte]: parseFloat(value) || 0 } },
                { category: { [Op.like]: `%${value}%` } },
            ]
            },
            include: [Files, Devise],
        order: [['id', 'DESC']]
    })
    } else {
        datas = await Operation.findAll({ order: [['id', 'DESC']], include: [Files, Devise] })
    }

    require('../../config/utils/returnListOfDatas')(req, res, 'operation', datas, req.query.data && req.query.data == 'yes' ? true : false)
}