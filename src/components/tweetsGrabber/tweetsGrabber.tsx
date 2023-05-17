// @ts-nocheck
import { server$ } from "@builder.io/qwik-city";
// import { readFile } from "fs/promises";
import { acceptedStocks } from "./acceptedStocks";
import { aapl } from "./aapl";
import { msft } from "./msft";
import { nvda } from "./nvda";
import { meta } from "./meta";
import { amzn } from "./amzn";

interface tweetSymbol {
  text: string;
}

export const tweetsGrabber = server$(async (stockTicker: string) => {
  stockTicker = stockTicker.toLowerCase();

  // Check if stock is within the list of accepted stocks
  if (!acceptedStocks[stockTicker]) return [];

  //   switch (stockTicker) {
  //     case "aapl":
  //       const parsedData = aapl;
  //       break;
  //     case "msft":
  //       const parsedData = msft;
  //       break;
  //     case "nvda":
  //       const parsedData = nvda;
  //       break;
  //     case "meta":
  //       const parsedData = meta;
  //       break;
  //     case "amzn":
  //       const parsedData = amzn;
  //       break;

  //     default:
  //       break;
  //   }
  let parsedData;

  if (stockTicker === "aapl") {
    parsedData = aapl;
  } else if (stockTicker === "msft") {
    parsedData = msft;
  } else if (stockTicker === "nvda") {
    parsedData = nvda;
  } else if (stockTicker === "meta") {
    parsedData = meta;
  } else if (stockTicker === "amzn") {
    parsedData = amzn;
  }

  //   // Create File path
  //   const filePath: string =
  //     process.cwd() + "/public/json/twitterResponse/" + stockTicker + ".json";

  // Workaround for: fs/promises not working on qwik-city vercel edge functions

  // Read Tweets data into JS
  //   const rawData = await readFile(filePath, { encoding: "utf8" });
  //   const parsedData = JSON.parse(rawData);

  const tweets = parsedData.globalObjects.tweets;
  const keys = Object.keys(tweets);

  // Extract only the tweets with relevant Cashtags
  const tweetsOnly = [];
  for (const key of keys) {
    // Checking Cashtags
    const isValidStockTweet = tweets[key].entities.symbols.some(
      (symbol: tweetSymbol) => symbol.text.toLowerCase() === stockTicker
    );
    isValidStockTweet && tweetsOnly.push(tweets[key].full_text);
  }
  return tweetsOnly;
});
