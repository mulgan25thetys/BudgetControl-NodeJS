const mimesTypes = ['jpg', 'jpeg', 'png','txt', 'pdf']
const maxSize = 2 * 1024 * 1024
const path = require('path')
const dotenv = require('dotenv')
const { Operation, Files } = require('../../config/database/database')
dotenv.config()

module.exports = async (req, res, ) => {
    const operation = await Operation.findOne({ where: { id: require('../../config/utils/getSearchId')(req.params.opid) } })
    if (!operation) {
        return res.status(404).json({ message: require('../../config/utils/getNotFoundMessageOfModule')('operation') })
    }

    if (!req.files) {
        return res.status(400).json({message: 'Please upload a file!'})
    } 
    const uploadedFile = req.files.files;

    if (!uploadedFile) {
        return res.status(400).json({message: 'Please upload a file!'})
    }

    if (uploadedFile.length > 1) {
        return res.status(400).json({message: 'Please upload one file!'})
    }

    const mimetype = uploadedFile.mimetype.split('/')[1]
    const extension = path.extname(uploadedFile.name).toLowerCase()
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

    if (!mimesTypes.includes(mimetype)) {
        return res.status(400).json({message:"Error: File upload only supports the "
        + "following filetypes - " + mimesTypes.join()})
    }

    if (uploadedFile.size > maxSize) {
        return res.status(400).json({message: 'The file is too large to upload!'})
    } else {
        adduploadedFile(operation.id, res, uploadedFile, uniqueSuffix, extension)
    }
}

function adduploadedFile(idOperation, res, uploadedFile, uniqueSuffix, extension) {
    const name = uniqueSuffix + extension 
    const extension_db =  extension
    const size = parseFloat(uploadedFile.size / (1024 * 1024)).toFixed(4) + 'MB'
    let types = ''
    switch (extension) {
        case '.txt':
            types = 'Texte'
            break;
        case '.pdf':
            types = 'Pdf'
            break;
        default:
            types = 'Image'
            break;
    }
    const dataFile = { name: name, extension: extension_db, size: size, types: types, OperationId: idOperation }

    Files.create(dataFile).then(() => {
        uploadedFile !== null ? uploadedFile.mv('./assets/operations/' + dataFile.name): null
            return res.status(201).json({ message: 'The ' + dataFile.name + ' file(s) has/have been added!' })
    }).catch(err => {
        return res.status(500).json({ message: err.message, data: err })
    })
}