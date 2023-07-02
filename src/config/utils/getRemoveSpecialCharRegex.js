module.exports = (stringName) => {
    return stringName.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '')
        .replace('"', '')
        .replace('\'', '')
        .replace(',', '')
        .replace('.', '-')
        .toString().toLowerCase()
        .trim()
}