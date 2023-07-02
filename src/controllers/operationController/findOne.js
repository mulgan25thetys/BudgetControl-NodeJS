const { Operation, Devise, Files } = require('../../config/database/database')

module.exports = async (req, res) => {
    const existedOperation = await Operation.findOne({
        where: { id: require('../../config/utils/getSearchId')(req.params.id) },
         include: [Files, Devise],
    })

    require('../../config/utils/returnOneData')(res, 'operation', existedOperation)
}