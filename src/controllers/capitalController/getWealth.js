const { Capital, Devise } = require('../../config/database/database')

module.exports = async (req, res) => {
    const Capitals = await Capital.findAll({ include: [Devise], order: [['id', 'DESC']], limit: 1 })
    const lastCapital = Capitals[0]

    if (lastCapital) {
        const amount = lastCapital.sign === 'negative' ? -lastCapital.amount : lastCapital.amount
        
        return res.status(200).json({ message: 'Total Wealth', data: { amount: amount, currency: lastCapital.Devise.currency} })
        
    } else {
        return res.status(200).json({ message: 'Total Wealth', data: 0 })
    }
}
