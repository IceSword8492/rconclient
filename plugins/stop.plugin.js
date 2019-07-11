// stop command

module.exports = ({Rcon, settings}) => {
    rcon = new Rcon(settings.rconhost, settings.rconpass), rcon.connect().then(_ => rcon.send(
        "stop"
    )).then(console.log).then(_ => {
        rcon.disconnect()
        process.exit(0)
    })
}