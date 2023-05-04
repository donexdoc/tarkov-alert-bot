import config from "config";
import request, { gql } from "graphql-request";
import { IItem, IItemRes } from "../../models/Item.js";

interface IGetTitemParams {
  itemId: string;
}

interface ISearchTitemParams {
  name: string;
}

export async function getItemInfo(params: IGetTitemParams): Promise<IItem | undefined> {
  const query = gql`
  {
    items(ids: "${params.itemId}", lang: ${config.get("apiReqLang")}) {
      id
      name
    }
  }
`;

  const response = await itemRequest(query);

  return response?.items[0];
}

export async function getItemPrices(params: IGetTitemParams): Promise<IItem | undefined> {
  const query = gql`
  {
    items(ids: "${params.itemId}", lang: ${config.get("apiReqLang")}) {
      id
      name
      basePrice
      avg24hPrice
      low24hPrice
      lastLowPrice
    }
  }
`;

  const response = await itemRequest(query);

  return response?.items[0];
}

export async function searchItem(params: ISearchTitemParams): Promise<IItem[] | undefined> {
  const query = gql`
  {
    items(names: "${params.name}", lang: ${config.get("apiReqLang")}) {
      id
      name
      basePrice
      avg24hPrice
      low24hPrice
      lastLowPrice
    }
  }
`;

  const response = await itemRequest(query);

  return response?.items;
}

export async function getItems(): Promise<IItem[] | undefined> {
  const query = gql`
    {
      items(lang: ${config.get("apiReqLang")}) {
        id
        name
      }
    }
  `;

  const response = await itemRequest(query);

  return response?.items;
}

async function itemRequest(query: string): Promise<IItemRes | undefined> {
  return await request(config.get("apiHost"), query)
    .then((data) => {
      const resData: IItemRes = <IItemRes>data;
      return resData;
    })
    .catch((error) => {
      console.log("item request error" + error);
      return undefined;
    });
}
