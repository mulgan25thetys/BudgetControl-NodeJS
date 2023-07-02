const { Op } = require('sequelize');
const { Capital, Devise } = require('../../config/database/database')

module.exports = async (deviseId, currency) => {
    const allCapitals = await Capital.findAll({
        where: {
            amount : { [Op.not ]: 0}
        },
        include: Devise
    })

    try {
        for (let i = 0; i < allCapitals.length; i++) {
        const capital = allCapitals[i];
        
        const CC = require('currency-converter-lt')
        const currencyConverter = new CC()

        const fromCurrency = capital.Devise.currency === 'XAF' ? 'FCFA' : capital.Devise.currency
        const toCurrency = currency === 'XAF' ? 'FCFA' : currency

        currencyConverter.from(fromCurrency).to(toCurrency).amount(capital.amount).convert().then((response) => {
                updateElement(deviseId, currency, response, capital)
            })
        }

        const capitalWithZeroAmount = await Capital.findAll({
            where: {
                amount : { [Op.eq ]: 0}
            },
            include: Devise
        })

        for (let i = 0; i < capitalWithZeroAmount.length; i++) {
            const element = capitalWithZeroAmount[i];
            updateElement(deviseId, currency, 0, element)
        }
    } catch (error) {
        require('../../config/log/logger')('fatal', error.message, error)
    }
}

function updateElement(deviseId, currency, amount, element) {
    Capital.update({ DeviseId: deviseId, amount: amount }, { where: { id: element.id } }).then(() => {
        require('../../config/log/logger')('info', 'Capital amount :' + element.amount + ' is updated to new devise: ' + currency, [])
    }).catch(err => {
        require('../../config/log/logger')('fatal', err.message, { errors: err.errors[0].message, origin: err.errors[0].origin })
    })
}