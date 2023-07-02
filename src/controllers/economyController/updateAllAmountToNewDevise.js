const { Op } = require('sequelize');
const { Economie, Devise } = require('../../config/database/database')

module.exports = async (deviseId, currency) => {
    const allEconomies = await Economie.findAll({where: {
            amount : { [Op.not ]: 0}
        }, include: Devise})

    try {
        for (let i = 0; i < allEconomies.length; i++) {
        const economy = allEconomies[i];
        
        const CC = require('currency-converter-lt')
        const currencyConverter = new CC()

        const fromCurrency = economy.Devise.currency === 'XAF' ? 'FCFA' : economy.Devise.currency
        const toCurrency = currency === 'XAF' ? 'FCFA' : currency

        currencyConverter.from(fromCurrency).to(toCurrency).amount(economy.amount).convert().then((response) => {
        
                updateElement(deviseId, currency, response, economy)
            })
        }

        const economiesWithZeroAmount = await Economie.findAll({
            where: {
                amount : { [Op.eq ]: 0}
            },
            include: Devise
        })

        for (let i = 0; i < economiesWithZeroAmount.length; i++) {
            const element = economiesWithZeroAmount[i];
            updateElement(deviseId, currency, 0, element)
        }
    } catch (error) {
        require('../../config/log/logger')('fatal', error.message, error)
    }
    
}

function updateElement(deviseId, currency, amount, element) {
    Economie.update({ DeviseId: deviseId, amount: amount }, { where: { id: element.id } }).then(() => {
        require('../../config/log/logger')('info', 'Capital amount :' + element.amount + ' is updated to new devise: ' + currency, [])
    }).catch(err => {
        require('../../config/log/logger')('fatal', err.message, { errors: err.errors[0].message, origin: err.errors[0].origin })
    })
}