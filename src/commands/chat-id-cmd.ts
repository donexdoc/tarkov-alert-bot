import TelegramBot from "node-telegram-bot-api";
import { BASIC_OPTIONS_PAYLOAD } from "./options.js";

export function chatIdCMD(bot: TelegramBot, exp: RegExp): void {
  bot.onText(exp, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `${chatId}`, BASIC_OPTIONS_PAYLOAD);
  });
}
