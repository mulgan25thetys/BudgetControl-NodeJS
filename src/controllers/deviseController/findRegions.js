const fs = require('fs')
const path = require('path')

module.exports = async (req, res) => {
    fs.readFile(path.resolve(__dirname, '../../config/datas/regions.js'), (err, data) => {
        if (err) {
            require('../../config/utils/catchError')(res, err)
        } else {
            return res.status(200).json({message: 'List of all regions!', data: require('../../config/datas/regions')})
        }
    })
}