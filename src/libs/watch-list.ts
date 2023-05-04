import fs from "fs";
import { IItem } from "../models/Item.js";
import config from "config";

const watchItemsFile = <string>config.get("watchItemsDb");

export function getWatchlist(): IItem[] {
  let wathItems: IItem[] = [];

  try {
    const _wathItems = JSON.parse(fs.readFileSync(watchItemsFile, "utf8"));

    wathItems = <IItem[]>_wathItems;
  } catch (error) {
    console.log("wathList parsing error", error);
  }

  return wathItems;
}

function saveWatchlist(watchlist: IItem[]): number | undefined {
  try {
    fs.writeFileSync(watchItemsFile, JSON.stringify(watchlist));

    return watchlist.length;
  } catch (error) {
    console.log("wathList saving error", error);
  }

  return;
}

export function addToWatchlist(newWatchItem: IItem): boolean {
  const itemAlreadyExist = isExistWathlist(newWatchItem.id);

  if (!itemAlreadyExist) {
    const wathlist = getWatchlist();
    wathlist.push(newWatchItem);
    saveWatchlist(wathlist);
    return true;
  }

  return false;
}

export function removeFromWatchlist(targetIndex: number): IItem | undefined {
  const wathlist = getWatchlist();

  for (const [index, listItem] of wathlist.entries()) {
    if (index === targetIndex) {
      wathlist.splice(index, 1);
      saveWatchlist(wathlist);
      return listItem;
    }
  }

  return;
}

export function setNotifyLowPrice(targetIndex: number, price: number): boolean {
  const wathlist = getWatchlist();

  for (const [index, listItem] of wathlist.entries()) {
    if (index === targetIndex) {
      listItem.notifyLowPrice = price;
      saveWatchlist(wathlist);
      return true;
    }
  }

  return false;
}

function isExistWathlist(targetWathItemId: string): boolean {
  const wathlist = getWatchlist();

  for (const listItem of wathlist) {
    if (listItem.id === targetWathItemId) return true;
  }

  return false;
}
