import TelegramBot from "node-telegram-bot-api";
import { BASIC_OPTIONS_PAYLOAD } from "./options.js";

const MESSAGE =
  "<b>🖖 Привет!</b>\n\n" +
  "Вот все команды:\n" +
  "#️⃣ <code>/start</code> - справка по боту\n" +
  "#️⃣ <code>/search 'название'</code> - поиск предметов\n" +
  "#️⃣ <code>/unwatch 'индекс'</code> - перестать отслеживать предмет\n" +
  "#️⃣ <code>/watchlist</code> - список всех интересующих товаров\n" +
  "#️⃣ <code>/setlow 'индекс' 'цена'</code> - установить минимальную цену для отслеживания\n" +
  "#️⃣ <code>/follow</code> - подписаться на уведомления\n" +
  "#️⃣ <code>/follow 'chat id'</code> - подписать человека по chat id\n" +
  "#️⃣ <code>/unfollow</code> - отписаться от уведомлений\n" +
  "#️⃣ <code>/unfollow 'chat id'</code> - отписать человека по chat id\n" +
  "#️⃣ <code>/chatid</code> - Ваш chat id\n" +
  "\n";

export function startCMD(bot: TelegramBot, exp: RegExp): void {
  bot.onText(exp, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, MESSAGE, BASIC_OPTIONS_PAYLOAD);
  });
}
