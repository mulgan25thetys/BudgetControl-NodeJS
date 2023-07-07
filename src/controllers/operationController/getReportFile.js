const { Operation } = require('../../config/database/database')

module.exports = async (req, res) => {
    let data = []
    const allOperations = await Operation.findAll()

    allOperations.forEach(operation => {
        data.push(operation.dataValues);
    });

    if (allOperations.length == 0) {
        return res.status(204).json({ message: 'No Data available!' })
    } else {
        require('../../config/utils/generateCsvFile')(req, res, 'operations', data)
    }
}