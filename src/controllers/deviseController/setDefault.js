const { Devise } = require('../../config/database/database')

module.exports = async (req, res) => {
    const existedDevise = await Devise.findOne({ // get existed devise after updating
        where: { id: require('../../config/utils/getSearchId')(req.params.id) }
    })

    if (!existedDevise) { //check id existed Devise is here
        return res.status(404).json({ message: require('../../config/utils/getNotFoundMessageOfModule')('devise'), data: existedDevise })
    } else {
        const allDevises = await Devise.findAll() // get all devise to update them default to none
        for (let i = 0; i < allDevises.length; i++) { 
            const devise = allDevises[i];
            await updateDeviseToDefault({ id: devise.id, currency: devise.currency}, false, false) // if those devises are default set to none 
        }
        // set the defined devise to default and update all capitals, economies and operations amount to this new one's currency
        await updateDeviseToDefault({ id: existedDevise.id, currency: existedDevise.currency}, true, true)
        return res.status(200).json({message: 'Operation done!'})
    }
}

async function updateDeviseToDefault(devise, isDefault, withCapitalUpdate) {
    try {
        await Devise.update({ default: isDefault }, { where: { id: devise.id } }) // set the current devise to default or not

        if (withCapitalUpdate && isDefault === true) { // if the new default devise update all capitals, economies and operations amounts 
            await updateAllAmountWithNewDevise(devise.id, devise.currency )
        }
    } catch (error) {
        console.log(error);
    }
}

//update all capitals, economies and operations to the new currency of the new devise
async function updateAllAmountWithNewDevise (deviseId, currency) {
    
    await require('../operationController/updateAllAmountToNewDevise')(deviseId, currency)
    await require('../capitalController/updateAllAmountToNewDevise')(deviseId, currency)
    await require('../economyController/updateAllAmountToNewDevise')(deviseId, currency)
    
}