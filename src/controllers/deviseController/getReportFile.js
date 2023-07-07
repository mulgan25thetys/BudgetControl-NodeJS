const { Devise } = require('../../config/database/database')

module.exports = async (req, res) => {
    let data = []
    const allDevises = await Devise.findAll()

    allDevises.forEach(devise => {
        data.push(devise.dataValues);
    });

    if (allDevises.length == 0) {
        return res.status(204).json({ message: 'No Data available!' })
    } else {
        require('../../config/utils/generateCsvFile')(req, res, 'devises', data)
    }
}