import fs from "fs";
import config from "config";

import { IBotSettings } from "../models/bot-settings.js";
const botSettingsFile = <string>config.get("botSettingsDb");

export function getBotSettings(): IBotSettings | undefined {
  try {
    const botSettings = JSON.parse(fs.readFileSync(botSettingsFile, "utf8"));
    return <IBotSettings>botSettings;
  } catch (error) {
    console.log("bot settings parsing error", error);
  }

  return;
}

export function saveBotSettings(botSettings: IBotSettings): boolean {
  try {
    fs.writeFileSync(botSettingsFile, JSON.stringify(botSettings));

    return true;
  } catch (error) {
    console.log("wathList saving error", error);
  }

  return false;
}

export function addFollowerChatId(chatId: number): boolean {
  const botSettings = getBotSettings();

  if (botSettings) {
    const alreadyExist = existsFollowerId(chatId);
    if (!alreadyExist) {
      botSettings.followers.push(chatId);
      saveBotSettings(botSettings);
    }
    return true;
  }

  return false;
}

export function removeFollowerChatId(chatId: number): boolean {
  const botSettings = getBotSettings();

  if (botSettings) {
    botSettings.followers = botSettings.followers.filter((listChatId) => listChatId !== chatId);
    saveBotSettings(botSettings);
    return true;
  }

  return false;
}

export function existsFollowerId(chatId: number): boolean {
  const botSettings = getBotSettings();

  if (botSettings) {
    for (const followerId of botSettings.followers) {
      if (followerId == chatId) return true;
    }
  }

  return false;
}
