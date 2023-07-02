const { Capital, Devise } = require('../../config/database/database')

module.exports = async (amount) => {
    const Capitals = await Capital.findAll({ order: [['id', 'DESC']], limit: 1 })
    const lastCapital = Capitals[0];
    if (lastCapital) {
        const lastamount = lastCapital.sign == 'negative'? -parseFloat(lastCapital.amount): parseFloat(lastCapital.amount) 
        const newAmount = lastamount + parseFloat(amount)

        return await createNewCapital(newAmount, lastCapital.DeviseId)
    } else {
        const defaultDevise = await Devise.findOne({ where: { default: true } })
        if (!defaultDevise) {
            return false
        } else {
            return await createNewCapital(amount, defaultDevise.id)
        }
    }
}

async function createNewCapital(newAmount, deviseId) {
    const newCapital = await Capital.create({ amount:  Math.abs(newAmount), sign: getSignOfValue(newAmount), DeviseId: deviseId })
    return newCapital? true : false
}

function getSignOfValue(amount) {
    if (amount > 0) {
        return 'positive'
    } else if (amount < 0) {
        return 'negative'
    }
    return 'nulle'
}