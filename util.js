module.exports = {
    createMessage: (status, message) => `[rconclient/${status}]: ${message}`,
    info: message => console.log(module.exports.createMessage("INFO", message)),
    warn: message => console.warn(module.exports.createMessage("WARN", message)),
    error: message => console.error(module.exports.createMessage("ERROR", message))
}