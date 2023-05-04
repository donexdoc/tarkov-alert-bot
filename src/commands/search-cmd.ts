import TelegramBot, { InlineKeyboardButton } from "node-telegram-bot-api";
import config from "config";

import { getItemInfo, searchItem } from "../libs/api/item.js";
import { BASIC_OPTIONS_PAYLOAD } from "./options.js";
import { IItem } from "../models/Item.js";
import { addToWatchlist } from "../libs/watch-list.js";

const WATCH_PREFIX = "watch-";

const MESSAGE = "📝 Найденные предметы. Нажмите на предмет, чтобы добавить его в список отслеживания.";
const ERROR_MESSAGE = "⛔️ Ошибка, вы ввели не верные данные!";
const MESSAGE_NOT_FOUND = "🤷‍♂️ Пердметы не найдены";
const SUCCESS_ADD_MESSAGE = "✅ Предмет успешно добавлен";
const ITEM_ALREADY_EXIST_MESSAGE = "⚠️ Предмет уже в списке наблюдения";
const ERROR_ADD_MESSAGE = "⚠️ Выбранный предмет не найден";

const SERACH_RESULT_MAX_DISPLAY = <number>config.get("searchResultMaxDisplay");
const SERACH_RESULT_TEXT_MAX_LENGTH = <number>config.get("searchResultTextMaxLength");

export function searchCMD(bot: TelegramBot, exp: RegExp): void {
  bot.onText(exp, async (msg, match) => {
    const chatId = msg.chat.id;
    const matchText = match ? match[1] : undefined;

    if (matchText) {
      const searchResult = await searchItem({ name: `${matchText}` });

      if (searchResult && searchResult.length) {
        const itemsKeyboard = generateItemsKeyboard(searchResult.slice(0, SERACH_RESULT_MAX_DISPLAY));
        bot.sendMessage(chatId, MESSAGE, {
          reply_markup: {
            inline_keyboard: itemsKeyboard,
          },
        });
      } else {
        bot.sendMessage(chatId, MESSAGE_NOT_FOUND, BASIC_OPTIONS_PAYLOAD);
      }
    } else {
      bot.sendMessage(chatId, ERROR_MESSAGE, BASIC_OPTIONS_PAYLOAD);
    }
  });

  bot.on("callback_query", async (query) => {
    const chatId = query.from.id;
    if (query.data?.includes(WATCH_PREFIX)) {
      const itemId = query.data.replace(WATCH_PREFIX, "");

      const itemInfo = await getItemInfo({ itemId: itemId });

      if (itemInfo) {
        const addResult = addToWatchlist(itemInfo);
        if (addResult) {
          bot.sendMessage(chatId, SUCCESS_ADD_MESSAGE, BASIC_OPTIONS_PAYLOAD);
        } else {
          bot.sendMessage(chatId, ITEM_ALREADY_EXIST_MESSAGE, BASIC_OPTIONS_PAYLOAD);
        }
      } else {
        bot.sendMessage(chatId, ERROR_ADD_MESSAGE, BASIC_OPTIONS_PAYLOAD);
      }
    }
  });
}

function generateItemsKeyboard(items: IItem[]): InlineKeyboardButton[][] {
  const elements = [];

  for (const item of items) {
    elements.push([
      {
        text: item.name.substring(0, SERACH_RESULT_TEXT_MAX_LENGTH),
        callback_data: WATCH_PREFIX + item.id,
      },
    ]);
  }

  return elements;
}
