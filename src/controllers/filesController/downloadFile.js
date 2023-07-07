/*eslint-disable */
const path = require('path')

module.exports = (req, res, folder) => {
  const fileName = req.params.filename
  const directoryPath = 'assets/'+folder+'/'

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      return res.status(500).json({
        message: 'Could not download the file. ' + err, data: directoryPath + fileName
      })
    }
  })
}