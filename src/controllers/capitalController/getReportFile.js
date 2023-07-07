const { Capital } = require('../../config/database/database')

module.exports = async (req, res) => {
    let data = []
    const allCapitals = await Capital.findAll()

    allCapitals.forEach(capital => {
        data.push(capital.dataValues);
    });

    if (allCapitals.length == 0) {
        return res.status(204).json({ message: 'No Data available!' })
    } else {
        require('../../config/utils/generateCsvFile')(req, res, 'capitals', data)
    }
}