module.exports = (module) => {
    return `One ${require('./removeSFormString')(module)} found!`
}