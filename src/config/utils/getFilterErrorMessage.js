module.exports = (message) => {
    return message.toString()
        .replace('column', 'field')
        .replace('at row 1', '')
        .replace('Validation error:', '')
        .replace('notNull Violation:','')
        .trim()
}