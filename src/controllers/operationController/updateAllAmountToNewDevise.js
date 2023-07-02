const { Op } = require('sequelize');
const { Operation, Devise } = require('../../config/database/database')

module.exports = async (deviseId, currency) => {
    const allOperations = await Operation.findAll({where: {
            amount : { [Op.not ]: 0}
        }, include: Devise })

    try {
        for (let i = 0; i < allOperations.length; i++) {
            const operation = allOperations[i];
        
            const CC = require('currency-converter-lt')
            const currencyConverter = new CC()

            const fromCurrency = operation.Devise.currency === 'XAF' ? 'FCFA' : operation.Devise.currency
            const toCurrency = currency === 'XAF' ? 'FCFA' : currency

            currencyConverter.from(fromCurrency).to(toCurrency).amount(operation.amount).convert().then((response) => {
        
                updateElement(deviseId, currency, response, operation)
            })
        }

        const operationsWithZeroAmount = await Operation.findAll({
            where: {
                amount : { [Op.eq ]: 0}
            },
            include: Devise
        })

        for (let i = 0; i < operationsWithZeroAmount.length; i++) {
            const element = operationsWithZeroAmount[i];
            updateElement(deviseId, currency, 0, element)
        }
    } catch (error) {
        require('../../config/log/logger')('fatal', error.message, error)
    }
}

function updateElement(deviseId, currency, amount, element) {
    Operation.update({ DeviseId: deviseId, amount: amount }, { where: { id: element.id } }).then(() => {
        require('../../config/log/logger')('info', 'Capital amount :' + element.amount + ' is updated to new devise: ' + currency, [])
    }).catch(err => {
        require('../../config/log/logger')('fatal', err.message, { errors: err.errors[0].message, origin: err.errors[0].origin })
    })
}