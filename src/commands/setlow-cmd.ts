import TelegramBot from "node-telegram-bot-api";
import { BASIC_OPTIONS_PAYLOAD } from "./options.js";
import { setNotifyLowPrice } from "../libs/watch-list.js";

const MESSAGE = "📘 Вы поменяли минимальную остслеживаемую цену на: ";
const SETTING_ERROR_MESSAGE = "⚠️ Ошибка. Неправильный индекс или цена!";
const PARAMS_ERROR_MESSAGE = "⚠️ Ошибка. Вы не указали индекс или цену!";

export function setlowCMD(bot: TelegramBot, exp: RegExp): void {
  bot.onText(exp, async (msg, match) => {
    const chatId = msg.chat.id;

    const matchIndex = match?.groups?.["index"];
    const matchPrice = match?.groups?.["price"];

    if (matchIndex && matchPrice) {
      const itemIndex = Number.parseInt(matchIndex);
      const itemLowPrice = Number.parseInt(matchPrice);

      const settingResult = setNotifyLowPrice(itemIndex, itemLowPrice);

      if (settingResult) {
        bot.sendMessage(chatId, MESSAGE + `<b>${itemLowPrice}</b>`, BASIC_OPTIONS_PAYLOAD);
      } else {
        bot.sendMessage(chatId, SETTING_ERROR_MESSAGE, BASIC_OPTIONS_PAYLOAD);
      }
    } else {
      bot.sendMessage(chatId, PARAMS_ERROR_MESSAGE, BASIC_OPTIONS_PAYLOAD);
    }
  });
}
