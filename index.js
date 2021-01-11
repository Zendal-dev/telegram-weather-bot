const { Telegraf } = require('telegraf')
const http = require('http')
const axios = require('axios')
const config = require('./config.js')

const BOT_TOKEN = config.BOT_TOKEN
const WEATHER_API_KEY = config.WEATHER_API_KEY

const bot = new Telegraf(BOT_TOKEN)

http.createServer().listen(process.env.PORT || 5000).on('request', (req, res) => {
   res.end('')
})

bot.start(ctx => ctx.reply('Enter city name'))

bot.help((ctx) => ctx.reply('I can\'t help you'))

bot.on('text', async ctx => {
   const userText = ctx.message.text

   try {
      const response = await axios.get(`http://api.weatherstack.com/current?access_key=${ WEATHER_API_KEY }&query=${ userText }`)
      const {
         location: { name, country },
         current: { temperature, weather_descriptions }
      } = response.data

      const formatData = `${ name }, ${ country } \nTemperature: ${ temperature }, ${ weather_descriptions }`

      ctx.reply(formatData)
   } catch (e) {
      ctx.reply('This city does not exist')
   }
})

bot.launch()