import TelegramBot from "node-telegram-bot-api";
import { BASIC_OPTIONS_PAYLOAD } from "./options.js";
import { removeFollowerChatId } from "../libs/bot-settings.js";
import { removeFromWatchlist } from "../libs/watch-list.js";

const MESSAGE = "📕 Вы удалили из списка наблюдения предмет: ";
const MESSAGE_ERROR = "📕 Ошибка. Вы не указали индекс.";

export function unwatchCMD(bot: TelegramBot, exp: RegExp): void {
  bot.onText(exp, (msg, match) => {
    const chatId = msg.chat.id;
    const matchUnwatchIndex = match ? match[1] : undefined;

    if (matchUnwatchIndex) {
      const newUnwatchIndex = Number.parseInt(matchUnwatchIndex.trim());
      const removedItem = removeFromWatchlist(newUnwatchIndex);
      bot.sendMessage(chatId, MESSAGE + removedItem?.name, BASIC_OPTIONS_PAYLOAD);
    } else {
      removeFollowerChatId(chatId);
      bot.sendMessage(chatId, MESSAGE_ERROR, BASIC_OPTIONS_PAYLOAD);
    }
  });
}
