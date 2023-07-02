const { Capital } = require('../../config/database/database')

module.exports = async (amount) => {
    const Capitals = await Capital.findAll({ order: [['updatedAt', 'DESC']], limit: 1 })
    const lastCapital = Capitals[0];
    if (lastCapital) {
        const newAmount = parseFloat(lastCapital.amount) + parseFloat(amount)
        return await createNewCapital(newAmount, lastCapital.DeviseId)
    } else {
        return await createNewCapital(amount, lastCapital.DeviseId)
    }
}

async function createNewCapital(newAmount, deviseId) {
    const newCapital = await Capital.create({ amount: newAmount, DeviseId: deviseId })
    return newCapital? true : false
}