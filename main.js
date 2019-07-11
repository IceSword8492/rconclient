readline = require("readline")
fs = require("fs")
util = require("./util")

settings = {
    file: __dirname + "/settings.json",
    plugindir: __dirname + "/plugins",
    plugins: [],
    rconhost: "localhost",
    rconport: 25575,
    rconpass: "password",
    loaded: false
}

try
{
    file = JSON.parse(fs.readFileSync(settings.file, "utf8"))
    Object.assign(settings, file)
    if (file.plugins && file.plugins.length)
    {
        settings.loaded = true
    }
}
catch
{
    util.warn(`not found: ${settings.file}`)
}

for (i = 0; i < process.argv.length; i++)
{
    switch (process.argv[i])
    {
    case "--plugin-dir":
        settings.plugindir = process.argv[++i]
        break
    case "--host":
        settings.rconhost = process.argv[++i]
        break
    case "--port":
        settings.rconport = process.argv[++i]
        break
    case "--pass":
        settings.rconpass = process.argv[++i]
        break
    }
}

walk = (dir) => {
    let result = []
    let f = fs.readdirSync(dir, {withFileTypes: true})
    f.forEach(d => {
        if (d.isDirectory())
        {
            walk(dir + "/" + d.name)
        }
        else
        {
            d.name = dir + (dir.lastIndexOf("/") === dir.length - 1 ? "" : "/") + d.name
            if (d.name.match(/\.plugin\.js/g))
            {
                if (!settings.loaded || (settings.loaded && settings.plugins.find(_ => _ === d.name.substring(d.name.lastIndexOf("/") + 1, d.name.lastIndexOf(".plugin.js")))))
                {
                    settings.plugins.push({
                        name: d.name.substring(d.name.lastIndexOf("/") + 1, d.name.lastIndexOf(".plugin.js")),
                        exec: require(d.name)
                    })
                    util.info(`loaded: ${d.name.substring(d.name.lastIndexOf("/") + 1, d.name.lastIndexOf(".plugin.js"))}`)
                }
                
            }
        }
    });
}

walk(settings.plugindir)

settings.plugins.push({
    name: "exit",
    exec: _ => process.exit(0)
})

Rcon = require("modern-rcon")

parse = line => {
    tokens = line.match(/```[\s\S]+```|"([^\\"]|\\.)*"|[^ |;]+|;|\|/g)
    for (i = 0; i < tokens.length; i++)
    {
      if (tokens[i].indexOf("\"") == 0 && tokens[i].lastIndexOf("\"") == tokens[i].length - 1)
      {
        tokens[i] = tokens[i].substring(1, tokens[i].length - 1)
      }
      if (tokens[i].indexOf("```") == 0 && tokens[i].lastIndexOf("```") == tokens[i].length - 3)
      {
        tokens[i] = tokens[i].substring(0, tokens[i].length - 3)
        tokens[i] = tokens[i].replace(/```[^ \n]*/, "")
      }
    }
    return [tokens.length, tokens, line]
}
exec = (argc, argv, line) => {
    settings.plugins.forEach((_) => {
        if (_.name === argv[0])
        {
            _.exec({argc, argv, command: argv.join(" "), Rcon, settings})
        }
    })
}
reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
reader.on("line", line => exec(...parse(line)))