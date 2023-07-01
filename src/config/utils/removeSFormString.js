module.exports = (stringValue) => {
    return stringValue.toString().endsWith('s') ?
        stringValue.toString().substring(0, stringValue.toString().length - 1).toLowerCase()
        : stringValue.toString().toLowerCase()
}