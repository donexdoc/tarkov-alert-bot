import config, { IConfig } from "config";

import { getBotSettings } from "../libs/bot-settings.js";
import { getWatchlist } from "../libs/watch-list.js";
import TelegramBot from "node-telegram-bot-api";
import { getItemPrices } from "../libs/api/item.js";
import { IItem } from "../models/Item.js";
import { BASIC_OPTIONS_PAYLOAD } from "../commands/options.js";

const tgConfig = <IConfig>config.get("tgConfig");
const bot = new TelegramBot(tgConfig.get("botToken"));

const MESSAGE_HEAD = "🚨 Алярм! 🚨\n🏷 Вкуснейшие цены на предметы:\n\n";

interface ILowPriceItem {
  item: IItem;
  price: number;
}

async function main(): Promise<void> {
  const botSettings = getBotSettings();

  if (!botSettings) {
    console.log("bot settings file is not setting up");
    return;
  }

  const watchlist = getWatchlist();
  const lowPriceItems = await getPrices(watchlist);

  if (lowPriceItems.length) {
    const pricesMessage = generatePriceListMessage(lowPriceItems);
    for (const followerChatId of botSettings.followers) {
      bot.sendMessage(followerChatId, MESSAGE_HEAD + pricesMessage, BASIC_OPTIONS_PAYLOAD);
    }
  }
}

async function getPrices(watchItems: IItem[]): Promise<ILowPriceItem[]> {
  const items: ILowPriceItem[] = [];

  for (const watchItem of watchItems) {
    const itemPrices = await getItemPrices({ itemId: watchItem.id });

    if (itemPrices?.lastLowPrice && watchItem.notifyLowPrice && itemPrices.lastLowPrice <= watchItem.notifyLowPrice) {
      items.push({ item: watchItem, price: itemPrices.lastLowPrice });
    }
  }

  return items;
}

function generatePriceListMessage(lowPriceItems: ILowPriceItem[]): string {
  let message = "";

  for (const lowPriceItem of lowPriceItems) {
    message += `🛒Предмет: <b>${lowPriceItem.item.name}</b>\n💵 Отслеживаемая цена: <b>${lowPriceItem.item.notifyLowPrice}</b>\n💰 Цена на барахолке: <b>${lowPriceItem.price}</b> \n\n`;
  }

  return message;
}

await main();
