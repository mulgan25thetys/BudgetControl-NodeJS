const { Economie, Capital } = require('../../config/database/database')

module.exports = async (req, res) => {
    delete req.body.DeviseId
    //economy amount is required
    if (!req.body.amount) {
        return res.status(400).json({ message: require('../../config/utils/valueIsRequiredMsg')('economy amount') })
    }

    const Capitals = await Capital.findAll({ order: [['updatedAt', 'DESC']], limit: 1 })
    const lastCapital = Capitals[0] //get last Capital
    //check if a capital is exist and have greater amount than the new economu amount
    if (lastCapital && lastCapital.amount > req.body.amount) {
        req.body = { ...req.body, ...{ DeviseId: lastCapital.DeviseId } }
        try {
            const economy = await Economie.create(req.body)
            //Update capital after adding new economy
            const result = await require('../capitalController/update')(-economy.amount)
            //return result by capital update result
            if (result) {
                return res.status(201).json({ message: require('../../config/utils/getCreatedMessage')('economy'), data: economy });
            } else {
                return res.status(500).json({message: require('../../config/utils/getOccuredErrorMessage')})
            }
        } catch(err) {
            require('../../config/utils/catchError')(res, err)
        }

    } else {
        return res.status(400).json({message: 'Operation failed! no capital available.'})
    }
}