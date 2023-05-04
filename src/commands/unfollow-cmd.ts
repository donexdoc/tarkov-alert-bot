import TelegramBot from "node-telegram-bot-api";
import { BASIC_OPTIONS_PAYLOAD } from "./options.js";
import { removeFollowerChatId } from "../libs/bot-settings.js";

const MESSAGE_UNFOLLOW = "🔇 Вы отписались от оповещений.";
const MESSAGE_USER_UNFOLLOW = "🔇 Вы отписали человека по chat id:";

export function unfollowCMD(bot: TelegramBot, exp: RegExp): void {
  bot.onText(exp, (msg, match) => {
    const chatId = msg.chat.id;
    const matchUnfollowChatId = match ? match[1] : undefined;

    if (matchUnfollowChatId) {
      const newUnfollower = Number.parseInt(matchUnfollowChatId.trim());
      removeFollowerChatId(newUnfollower);
      bot.sendMessage(chatId, MESSAGE_USER_UNFOLLOW + newUnfollower, BASIC_OPTIONS_PAYLOAD);
    } else {
      removeFollowerChatId(chatId);
      bot.sendMessage(chatId, MESSAGE_UNFOLLOW, BASIC_OPTIONS_PAYLOAD);
    }
  });
}
