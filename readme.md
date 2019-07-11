# RconClient


![LICENSE](https://img.shields.io/badge/license-MIT-brightgreen.svg) ![VERSION](https://img.shields.io/badge/version-0.1.4a-orange.svg) ![NODE](https://img.shields.io/badge/node-v12.1.0-orange.svg)


## 概要


Minecraftのバニラ鯖を外部から操作できます。 (Mod不要)

[Node.js](https://nodejs.org/ja/)が必要です。 **(v12.1.0以上で動作確認済)**


## 使用法

main.jsが存在するディレクトリで以下のコマンドを実行して起動します。

```sh
node .
```

設定はsettings.jsonを書き換えることで変更できます。

```json
{
    "plugindir": "./plugins",
    "plugins": [
        "help"
    ],
    "rconhost": "server_host_address",
    "rconport": "server_rcon_port",
    "rconpass": "server_rcon_password"
}
```
  
`plugindir`は読み込むプラグインが存在しているディレクトリを指定します。
  
`plugins`は指定したプラグインのみ導入する場合に指定します。空配列を指定することですべてのプラグインを読み込むことができます。
  
`rconhost`にはサーバーのアドレスを指定します。(localhostも可)
  
`rconport`にはサーバーのRconのポート番号を指定します。
  
`rconpass`にはサーバーのRconのパスワードを指定します。


## オプション

```sh
Usage: node . [options]

Options:
    --plugin-dir <directory: string>    プラグイン読み込みディレクトリを指定します。
    --host <host: string>               サーバアドレスを指定します。
    --port <port: integer>              Rconポートを指定します。
    --pass <password: string>           Rconパスワードを指定します
```