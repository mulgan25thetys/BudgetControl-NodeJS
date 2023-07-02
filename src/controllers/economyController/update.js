const { Economie } = require('../../config/database/database')
const messageSuccess = 'One Economy is up to date!'

module.exports = async (req, res) => {
    delete req.body.DeviseId

    const updatedEconomy = await Economie.findOne({ where: { id: require('../../config/utils/getSearchId')(req.body.id) } })

    if (updatedEconomy) {
        if (req.body.amount) {
            await updateEconomyAndCapital(req, res, updatedEconomy)
        } else {
            Economie.update(req.body, { where: { id: updatedEconomy.id } }).then(() => {
                return res.status(200).json({ message: messageSuccess })
            }).catch(err => {
                require('../../config/utils/catchError')(res, err)
            })
        }
    } else {
        return res.status(404).json({ message: require('../../config/utils/getNotFoundMessageOfModule')('economy'), data: updatedEconomy })
    }
}

async function updateEconomyAndCapital(req, res, updatedEconomy) {
    const result1 = await require('../capitalController/update')(updatedEconomy.amount)

    if (result1) {
        try {
            await Economie.update(req.body, { where: { id: updatedEconomy.id}})
            const result2 = await require('../capitalController/update')(-req.body.amount)
            if (result2) {
                return res.status(200).json({ message: messageSuccess })
            } else {
                return res.status(500).json({ message: require('../../config/utils/getOccuredErrorMessage')})
            }
        }catch(err ) {
            require('../../config/utils/catchError')(res, err)
        }
    } else {
        return res.status(500).json({ message: require('../../config/utils/getOccuredErrorMessage')})
    }
}