# import warnings
# warnings.filterwarnings("ignore")
import filelock
import snscrape.modules.twitter as sntwitter
import pandas as pd
import datetime
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

pd.set_option('display.max_colwidth', None) # Display all of the Tweet

# This is how you fetch Tweets
stockNames = ["MSFT", "NVDA"]
tweetAmountLimit = 5
startLookingAtLeastTheseDaysInThePast = 7
df = pd.DataFrame([], columns=["StockName","Date", "Tweet", "CashTag"])
rename_stock_mapping = { "SPX":"^SPX"}
analyzer = SentimentIntensityAnalyzer()


for stockName in stockNames:
  tweets = []

  for tweet in  sntwitter.TwitterSearchScraper(stockName).get_items():
    if (len(tweets) == tweetAmountLimit):
      break
    elif (tweet.cashtags is not None) and len(tweet.cashtags) == 1: # only get tweets with 1 stock
      tweetSentiment = analyzer.polarity_scores(tweet.rawContent)
      tweets.append([ stockName, tweet.date , tweet.rawContent, tweetSentiment, tweet.cashtags ])
    else: continue

  df_temp = pd.DataFrame(tweets, columns=["StockName", "Date", "Tweet", "Sentiment", "CashTag" ])
  df = pd.concat([df, df_temp])

df.set_index(["StockName", df.index], inplace=True)
df.index.names = ["StockName", "Count"]
df