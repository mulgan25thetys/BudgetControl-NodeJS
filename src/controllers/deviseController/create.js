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

            
            Devise.create({ currency: newCurrency, region: entryRegion.name, iso2: entryRegion.iso2.toString().toLowerCase() }).then(devise => {
                return res.status(201).json({ message: require('../../config/utils/getCreatedMessage')('devise'), data: devise })
            }).catch(err => {
                require('../../config/utils/catchError')(res, err)
            })

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