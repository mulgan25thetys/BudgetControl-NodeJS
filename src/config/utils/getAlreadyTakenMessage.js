module.exports = (element) => {
    return `The ${require('./removeSFormString')(element)} is already taken!`
}