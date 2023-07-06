const { Capital, Devise } = require('../../config/database/database')

module.exports = async (req, res) => {
    const Capitals = await Capital.findAll({ include: [Devise], order: [['id', 'DESC']], limit: 2 })
    const lastCapital = Capitals[0]
    const beforeLastCapital = Capitals[1]

    if (lastCapital) {
        const amount = lastCapital.sign === 'negative' ? -lastCapital.amount : lastCapital.amount
        let beforeamount = null

        if (beforeLastCapital) {
            beforeamount = beforeLastCapital.sign === 'negative' ? -beforeLastCapital.amount : beforeLastCapital.amount
        }

        const changeRate = getCapitalChangeRate(amount,  beforeamount)
        const color = changeRate > 0? 'success' :'danger'
        return res.status(200).json({
            message: 'Total Wealth',
            data: { amount: Math.round(amount), currency: lastCapital.Devise.currency, changeRate: changeRate, color: color }
        })
        
    } else {
        return res.status(200).json({
            message: 'Total Wealth',
            data: { amount: 0, currency: 'USD', changeRate: 0, color: 'success' }
        })
    }
}

function getCapitalChangeRate(lastAmount, beforeLastAmount) {

    if (!beforeLastAmount) {
        return 100
    } else {
        const changeRate = (parseFloat(lastAmount) - parseFloat(beforeLastAmount)) / (parseFloat(beforeLastAmount))
        return changeRate * 100
    }
    
}