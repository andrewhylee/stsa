// @ts-nocheck
import { server$ } from "@builder.io/qwik-city";
import { readFile } from "fs/promises";
import { acceptedStocks } from "./acceptedStocks";

interface tweetSymbol {
  text: string;
}

export const tweetsGrabber = server$(async (stockTicker: string) => {
  stockTicker = stockTicker.toLowerCase();

  // Check if stock is within the list of accepted stocks
  if (!acceptedStocks[stockTicker]) return [];

  // Create File path
  const filePath: string =
    process.cwd() + "/public/json/twitterResponse/" + stockTicker + ".json";

  // Read Tweets data into JS
  const rawData = await readFile(filePath, { encoding: "utf8" });
  const parsedData = JSON.parse(rawData);
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
