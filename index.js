const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env['TOKEN'];

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo.+/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, "hey hey hey");
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {


  const https = require('node:https');


  const chatId = msg.chat.id;
  const regex = /((?<=https:\/\/www.tiktok.com.+)[0-9]{15,})|(?<=https:\/\/vt.tiktok.com\/+).{5,}/

  const video_id = msg.text.match(regex)[0];

  const proxitok_link = "https://proxitok.pabloferreiro.es/@placeholder/video/" + String(video_id)

  const video_link_regex = /(?<= href=").+.(?= class="dropdown-item">No watermark)/




  https.get(proxitok_link, (res) => {

    let data = '';

    // A chunk of data has been received.
    res.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    res.on('end', () => {
      //.match(video_link_regex)[0]

      bot.sendVideo(chatId, data.match(video_link_regex)[0].slice(0, -2));
      //console.log(msg)
      bot.deleteMessage(chatId, msg.message_id)
    });

  }).on('error', (e) => {
    console.error(e);
  });




  //https://proxitok.pabloferreiro.es/@placeholder/video/ZS8AAePL7/


  //console.log(msg.text.match(regex)[0])

});