const { Devise, Capital } = require('../../config/database/database')

module.exports = async (req, res) => {
    const existedDevise = await Devise.findOne({
        where: { id: require('../../config/utils/getSearchId')(req.params.id) }
    })

    if (!existedDevise) {
        return res.status(404).json({ message: require('../../config/utils/getNotFoundMessageOfModule')('devise'), data: existedDevise })
    } else {
        const allDevises = await Devise.findAll()
        for (let i = 0; i < allDevises.length; i++) {
            const devise = allDevises[i];
            updateDeviseToDefault(devise.id, false, false)
        }
        updateDeviseToDefault(existedDevise.id, true, true)
        return res.status(200).json({message: 'Operation done!'})
    }
}

async function updateDeviseToDefault(deviseId, isDefault, withCapitalUpdate) {
    try {
        await Devise.update({ default: isDefault }, { where: { id: deviseId } })

        if (withCapitalUpdate && isDefault === true) {
            const allCapitals = await Capital.findAll()
            for (let i = 0; i < allCapitals.length; i++) {
                const capital = allCapitals[i];
                await Capital.update({ DeviseId: deviseId }, { where: { id: capital.id } })
            }
        }
    } catch (error) {
        console.log(error);
    }
}