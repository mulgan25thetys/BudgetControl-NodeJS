const { Capital, Devise, Economie } = require('../../config/database/database')

module.exports = async (req, res) => {
    const Capitals = await Capital.findAll({ include: [Devise], order: [['id', 'DESC']], limit: 1 })
    const lastCapital = Capitals[0]

    if (lastCapital) {
        const allEconomies = await Economie.findAll()
        const amount = lastCapital.sign === 'negative' ? -lastCapital.amount : lastCapital.amount
        
        if (allEconomies.length > 0) {
            let sum = 0
            for (let i = 0; i < allEconomies.length; i++) {
                const economie = allEconomies[i];
                sum += economie.amount
            }
            //calculate total amount with all economie and last capital
            return res.status(200).json({ message: 'Total Wealth', data: { amount: amount + sum, currency: lastCapital.Devise.currency} })
        } else {
            return res.status(200).json({ message: 'Total Wealth', data: { amount: amount, currency: lastCapital.Devise.currency} })
        }
    } else {
        return res.status(200).json({ message: 'Total Wealth', data: 0 })
    }
}
