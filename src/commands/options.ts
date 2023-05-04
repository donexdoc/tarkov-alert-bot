import config, { IConfig } from "config";
import { SendMessageOptions } from "node-telegram-bot-api";

const tgConfig = <IConfig>config.get("tgConfig");

export const BASIC_OPTIONS_PAYLOAD = <SendMessageOptions>{
  parse_mode: "HTML",
  reply_markup: {
    resize_keyboard: true,
    one_time_keyboard: true,
    keyboard: tgConfig.get("baseKeyboard"),
  },
};
