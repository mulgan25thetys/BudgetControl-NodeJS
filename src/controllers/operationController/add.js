const { Devise, Operation } = require('../../config/database/database')
var slugify = require('slugify')

module.exports = async (req, res) => {
    let slug = ''
    delete req.body.DeviseId //remove Devise Id and add it automatically

    try {
        if (!req.body.category) { // check the operation category
            return res.status(400).json({ message: require('../../config/utils/valueIsRequiredMsg')("operation category") })
        }
        const defaultDevise = await Devise.findOne({ where: { default: true } }) // get the default devise for each operation

        if (!defaultDevise) {
            return res.status(400).json({ message: 'Please add a devise before proceeding or set a default one' })
        }

        if (req.body.object) { // slugify the operation object

            req.body.object = require('../../config/utils/getRemoveSpecialCharRegex')(req.body.object)
            slug = slugify(req.body.object)
        }
        req.body = { ...req.body, ...{ DeviseId: defaultDevise.id, slug: slug } } // update the requeste body data
        
        try { 
            const operation = await Operation.create(req.body)
            let result = false
            if (operation.category === "receipt") { // update capital after adding an operation
                result = await require('../capitalController/update')(req.body.amount)
            } else if (operation.category === "expense") {
                result = await require('../capitalController/update')(-req.body.amount)
            }
            
            if (result) { // check if the capital has been up to date
                return res.status(201).json({ message: require('../../config/utils/getCreatedMessage')('operation'), data: operation })
            } else { // return An error message if an internal server error occured
                return res.status(500).json({message: require('../../config/utils/getOccuredErrorMessage')})
            }
        }catch (err ) {
            require('../../config/utils/catchError')(res, err)
        }
    } catch (error) {
        require('../../config/utils/catchError')(res, error)
    }
}