const { Devise, Operation } = require('../../config/database/database')
var slugify = require('slugify')

module.exports = async (req, res) => {
    let slug = ''
    delete req.body.DeviseId

    try {
        if (!req.body.category) {
            return res.status(400).json({ message: require('../../config/utils/valueIsRequiredMsg')("operation category") })
        }
        const defaultDevise = await Devise.findOne({ where: { default: true } })

        if (req.body.object) {
            req.body.object = require('../../config/utils/getRemoveSpecialCharRegex')(req.body.object)
            slug = slugify(req.body.object)
        }
        req.body = { ...req.body, ...{ DeviseId: defaultDevise.id, slug: slug } }
        
        Operation.create(req.body).then(operation => {
            return res.status(201).json({ message: require('../../config/utils/getCreatedMessage')('operation'), data: operation })
        }).catch(err => {
            require('../../config/utils/catchError')(res, err)
        })
    } catch (error) {
        require('../../config/utils/catchError')(res, error)
    }
}