const path = require('path')
const { Operation, Files } = require('../../config/database/database')
const fs = require('fs')

module.exports = async (req, res) => {
    const deletedOperation = await Operation.findOne({
        where: { id: require('../../config/utils/getSearchId')(req.params.id) },
        include: [Files]
    })

    if (!deletedOperation) {
        return res.status(404).json({ message: require('../../config/utils/getNotFoundMessageOfModule')('operation'), data: deletedOperation })
    } else {
        Operation.destroy({ where: { id: deletedOperation.id } }).then(() => {

            if (deletedOperation.Files.length > 0) {
                for (let i = 0; i < deletedOperation.Files.length; i++) {
                    const file = deletedOperation.Files[i];
                    if (fs.existsSync(path.resolve(__dirname, '../../../assets/operations/' + file.name))) {
                        fs.unlink(path.resolve(__dirname, '../../../assets/operations/' + file.name), (err => {
                            if (err) {
                                console.log(err);
                            }
                        }))
                    }
                }
            }
            return res.status(200).json({ message: require('../../config/utils/getDeleteMessage')('Operation: ' + deletedOperation.object + ' '), data: deletedOperation })
        }).catch(err => {
            require('../../config/utils/catchError')(res, err)
        })
    }
}