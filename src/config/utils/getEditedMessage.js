module.exports = (item, message) => {
    return `${item.charAt(0).toUpperCase() + item.slice(1)}: ${message} is up to date!`
}