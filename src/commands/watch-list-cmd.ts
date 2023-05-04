import TelegramBot from "node-telegram-bot-api";
import config from "config";

import { BASIC_OPTIONS_PAYLOAD } from "./options.js";
import { IItem } from "../models/Item.js";
import { getWatchlist } from "../libs/watch-list.js";

const MESSAGE = "📗 Это предметы из списка наблюдения:";
const EMPTY_LIST_MESSAGE = "🤷‍♂️ Пока что список пуст";
const WATCH_LOW_PRICE_UNSET = "🚫";
const SERACH_RESULT_TEXT_MAX_LENGTH = <number>config.get("searchResultTextMaxLength");

export function watchListCMD(bot: TelegramBot, exp: RegExp): void {
  bot.onText(exp, (msg) => {
    const chatId = msg.chat.id;
    const watchlist = getWatchlist();

    if (watchlist?.length) {
      const wathlistText = generateWatchListText(watchlist);
      bot.sendMessage(chatId, MESSAGE + "\n\n" + wathlistText, BASIC_OPTIONS_PAYLOAD);
    } else {
      bot.sendMessage(chatId, EMPTY_LIST_MESSAGE, BASIC_OPTIONS_PAYLOAD);
    }
  });
}

function generateWatchListText(watchItems: IItem[]): string {
  let watchList = "";

  for (const [index, watchItem] of watchItems.entries()) {
    watchList += `<b>${index}</b> - ${watchItem.name.substring(0, SERACH_RESULT_TEXT_MAX_LENGTH)} - 💵 ${
      watchItem.notifyLowPrice ? watchItem.notifyLowPrice : WATCH_LOW_PRICE_UNSET
    }\n`;
  }

  return watchList;
}
