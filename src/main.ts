import config, { IConfig } from "config";
import TelegramBot from "node-telegram-bot-api";
import { applyBotCommands } from "./commands/index.js";

const tgConfig = <IConfig>config.get("tgConfig");
const APP_NAME = <string>config.get("appName");

// выводим информацию о запуске приложения
console.log(`Application - ${APP_NAME} is started!`);

// инициализируем бота в режиме polling
const bot = new TelegramBot(tgConfig.get("botToken"), { polling: true });

// применяем комманды к боту
applyBotCommands(bot);
// какая-то новая правка