import {
    Client,
    GatewayIntentBits,
    Guild,
    Message,
    Events,
    EmbedBuilder,
} from 'discord.js'

import createJieba from 'js-jieba'
import {
    JiebaDict, HMMModel, UserDict, IDF, StopWords
} from 'jieba-zh-tw'
import { token } from './token'

const debug = true

const jieba = createJieba(
    JiebaDict,
    HMMModel,
    UserDict,
    IDF,
    StopWords
)

const 支語: string[] = ["視頻", "西紅柿", "牛油果", "黃油", "估計", "牛逼", "卧槽", "臥槽", "臥操", "沃槽", "西蘭花", "小姐姐",
    "小哥哥", "信息", "網絡", "屏幕", "內存", "硬盤", "鎖屏", "U盤", "u盤", "你媽死了", "NMSL", "走心", "短信", "立馬", "牛び", "老鐵"]

function main(token: string) {
    支語.forEach((v) => { jieba.insertUserWord(v) })

    const client: Client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
    })

    client.login(token)

    client.once(Events.ClientReady, (client: any) => {
        console.log(`Logged in as ${client.user?.tag}!`)
    })

    client.on(Events.GuildCreate, async (guild: Guild) => {
        console.log(`guild crated! ${guild.id}`)
    })

    client.on(Events.Error, (e: any) => {
        console.log('client on error', e)
    })

    // client.on(Events.InteractionCreate, async (interaction: Interaction) => {})

    client.on(Events.MessageCreate, (msg: Message) => {
        if (!msg.author.bot) {

            let detected: string[] = []
            // const cutRes = jieba.cut(msg.content)
            // const cutRes = jieba.cutAll(msg.content)
            const cutRes = jieba.cutForSearch(msg.content, true)

            if (debug) {
                console.log(cutRes)
            }

            for (let j = 0; j < 支語.length; j++) {
                for (let i = 0; i < cutRes.length; i++) {
                    if (cutRes[i] == 支語[j]) {
                        detected.push(支語[j])
                        break
                    }
                }
            }
            if (detected.length > 0) {
                msg.reply({
                    embeds: [new EmbedBuilder()
                        .setTitle('支語警察出勤！')
                        .setColor(0xf54242)
                        .setDescription(`檢測到使用者 ${msg.author.displayName} 使用支語：${detected.join("、")}`)]
                })
            }
        }
    })
}

main(token)