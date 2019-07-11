// difficulty command

module.exports = ({argc, argv, Rcon, settings}) => {
    rcon = new Rcon(settings.rconhost, settings.rconpass), rcon.connect().then(_ => rcon.send(
        `${argv[0]} ${isNaN(parseInt(argv[1])) ? argv[1] : parseInt(argv[1]) === 0 ? "peaceful" : parseInt(argv[1]) === 1 ? "easy" : parseInt(argv[1]) === 2 ? "normal" : parseInt(argv[1]) === 3 ? "hard" : "undefined"}`
    )).then(console.log).then(_ => rcon.disconnect())
}