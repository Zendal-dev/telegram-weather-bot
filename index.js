require('dotenv').config()
const { Telegraf } = require('telegraf')

const BOT_TOKEN = process.env.BOT_TOKEN
const WEATHER_API_KEY = process.env.WEATHER_API_KEY

const bot = new Telegraf(BOT_TOKEN)

bot.start(ctx => ctx.reply('Enter city name'))
bot.help((ctx) => ctx.reply('I can\'t help you'))

bot.on('text', ctx => {
   const userText = ctx.message.text

   ctx.reply(userText)
})

bot.launch()