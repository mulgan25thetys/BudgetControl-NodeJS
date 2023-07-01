module.exports = (res, module, data) => {
    if (!data) {
        return res.status(404).json({ message: require('./getNotFoundMessageOfModule')(module), data: data })
    } else {
        return res.status(200).json({ message: require('./getFoundMessageOfModule')(module), data: data })
    }
}