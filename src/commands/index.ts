import TelegramBot from "node-telegram-bot-api";
import { searchCMD } from "./search-cmd.js";
import { startCMD } from "./start-cmd.js";
import { watchListCMD } from "./watch-list-cmd.js";
import { unwatchCMD } from "./unwatch-cmd.js";
import { setlowCMD } from "./setlow-cmd.js";
import { chatIdCMD } from "./chat-id-cmd.js";
import { followCMD } from "./follow-cmd.js";
import { unfollowCMD } from "./unfollow-cmd.js";

export function applyBotCommands(bot: TelegramBot): void {
  startCMD(bot, /\/start/);
  chatIdCMD(bot, /\/chatid/);
  watchListCMD(bot, /\/watchlist/);
  searchCMD(bot, /\/search (.+)/);
  unwatchCMD(bot, /\/unwatch (.+)/);
  setlowCMD(bot, /\/setlow (?<index>\d+) (?<price>\d+)/);
  followCMD(bot, /\/follow(.*)/);
  unfollowCMD(bot, /\/unfollow(.*)/);
}
