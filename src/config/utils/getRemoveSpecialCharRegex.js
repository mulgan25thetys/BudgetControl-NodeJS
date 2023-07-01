module.exports = (stringName) => {
    return stringName.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '').replace('"', '').replace('\'', '').trim()
}