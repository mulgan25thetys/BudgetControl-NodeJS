const { Devise } = require('../../config/database/database')
const regions = require('../../config/datas/regions')

module.exports = async (req, res) => {
    if (!req.body.region) {
        return res.status(400).json({ message: require('../../config/utils/valueIsRequiredMsg')('Region') })
    }

    try {
        const entryRegion = getEntryRegion(req.body.region)
        if (entryRegion) {
            const countryToCurrency = require('country-to-currency')
            const newCurrency = countryToCurrency[entryRegion.iso2]
            const existedDevise = await Devise.findOne({ where: { currency: newCurrency } })

            if (existedDevise) {
                return res.status(409).json({message: require('../../config/utils/getIfAlreadyExist')('region\'s currency')})
            } else {
                Devise.create({ currency: newCurrency, region: entryRegion.name }).then(devise => {
                    return res.status(201).json({ message: require('../../config/utils/getCreatedMessage')('devise'), data: devise })
                }).catch(err => {
                    require('../../config/utils/catchError')(res, err)
                })
            }

        } else {
            return res.status(404).json({ message: require('../../config/utils/getNotFoundMessageOfModule')('region'), data: entryRegion })
        }
    } catch (error) {
        require('../../config/utils/catchError')(res, error)
    }
}

function getEntryRegion(entryRegion) {
    for (let i = 0; i < regions.length; i++) {
        const region = regions[i];
        if (entryRegion.toString().toLowerCase() === region.name.toString().toLowerCase()
            || entryRegion.toString().toUpperCase() === region.iso2.toString()) {
            return region
        }
    }
    return null
}