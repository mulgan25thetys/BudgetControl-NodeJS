const fs = require("fs");
const csv = require("csv-stringify");
const path = require('path')
const folder = 'reports'
const dotenv = require('dotenv')

dotenv.config()

module.exports = async (req, res, fileName, data) => {
    fileName = process.env.SYSTEM_NAME.toString() + '-' + fileName + '.csv'
      
    // (C) WRITE TO FILE ROW BY ROW
   
    csv.stringify(data, {
        header : true,
    }, (err, output) => {
        if (err) {
            return res.status(500).json({ message: err.message, data: err })
        } else {
            fs.writeFileSync(path.resolve(__dirname, '../../../assets/' + folder + '/' + fileName), output)
            req.params = { filename: fileName}
            require('../../controllers/filesController/downloadFile')(req, res, folder)
        }
    });
}