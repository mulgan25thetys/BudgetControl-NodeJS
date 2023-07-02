const path = require('path')
const { Files } = require('../../config/database/database')
const fs = require('fs')

module.exports = async (req, res) => {
    const exitedFile = await Files.findOne({ where: { id: require('../../config/utils/getSearchId')(req.params.fileid) } })

    if (!exitedFile) {
        return res.status(404).json({ message: require('../../config/utils/getNotFoundMessageOfModule')('file') })
    } else {
        try {
            Files.destroy({ where: { id: exitedFile.id } }).then(() => {
                if (fs.existsSync(path.resolve(__dirname,'../../../assets/operations/'+exitedFile.name))) {
                    fs.unlink(path.resolve(__dirname, '../../../assets/operations/' + exitedFile.name), (err => {
                        if (err) {
                            require('../../config/utils/catchError')(res, err)
                        } else {
                            return res.status(200).json({ message: require('../../config/utils/getDeleteMessage')('file: ' + exitedFile.name) })
                        }
                    }))
                }
            }).catch(err => {
                require('../../config/utils/catchError')(res, err)
            })
        } catch (error) {
            require('../../config/utils/catchError')(res, error)
        }
    }
}