import fs from "fs";
import config from "config";
import { getItems } from "./api/item.js";

const localDBFile = <string>config.get("localItemsDb");

export async function updateItemsDb(): Promise<number | undefined> {
  const items = await getItems();

  if (items) {
    fs.writeFileSync(localDBFile, JSON.stringify(items));

    return items.length;
  }

  return;
}
