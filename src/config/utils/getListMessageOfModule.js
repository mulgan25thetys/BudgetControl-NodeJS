module.exports = (module) => {
    module = !module.toString().endsWith('s') ?
        module.toString() + 's'
        : module.toString().toLowerCase()
        
    return `List of all ${module.trim()}.`
}
