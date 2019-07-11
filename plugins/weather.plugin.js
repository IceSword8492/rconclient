// weather command

module.exports = ({command, Rcon, settings}) => {
    rcon = new Rcon(settings.rconhost, settings.rconpass), rcon.connect().then(_ => rcon.send(
        command
    )).then(console.log).then(_ => rcon.disconnect())
}