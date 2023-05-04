import TelegramBot from "node-telegram-bot-api";
import { BASIC_OPTIONS_PAYLOAD } from "./options.js";
import { addFollowerChatId } from "../libs/bot-settings.js";

const MESSAGE = "🔊 Вы подписались на оповещения!";
const MESSAGE_USER_FOLLOW = "🔊 Вы подписали пользователя с chat id: ";

export function followCMD(bot: TelegramBot, exp: RegExp): void {
  bot.onText(exp, (msg, match) => {
    const chatId = msg.chat.id;
    const matchFollowChatId = match ? match[1] : undefined;

    if (matchFollowChatId) {
      const newFollower = Number.parseInt(matchFollowChatId.trim());
      addFollowerChatId(newFollower);
      bot.sendMessage(chatId, MESSAGE_USER_FOLLOW + newFollower, BASIC_OPTIONS_PAYLOAD);
    } else {
      addFollowerChatId(chatId);
      bot.sendMessage(chatId, MESSAGE, BASIC_OPTIONS_PAYLOAD);
    }
  });
}
