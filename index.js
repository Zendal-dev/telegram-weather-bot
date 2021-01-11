const { Telegraf } = require('telegraf')
const http = require('http')

const BOT_TOKEN = require('./config.js').BOT_TOKEN
const WEATHER_API_KEY = require('./config.js').WEATHER_API_KEY

const bot = new Telegraf(BOT_TOKEN)

http.createServer().listen(process.env.PORT || 5000).on('request', (req, res) => {
   res.end('')
})

bot.start(ctx => ctx.reply('Enter city name'))

bot.help((ctx) => ctx.reply('I can\'t help you'))

bot.on('text', ctx => {
   const userText = ctx.message.text

   ctx.reply(userText)
})

bot.launch()