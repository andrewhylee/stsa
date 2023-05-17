# import sys
# !pip install snscrape
# !pip install pandas
# !pip install vaderSentiment
# import snscrape.modules.twitter as sntwitter
# print('hello' + sys.argv[1])
# print('hello brewwwww' )
# sys.stdout.flush()

import sys
import subprocess
import os

class App:
    def __init__(self, virtual_dir):
        self.virtual_dir = virtual_dir
        self.virtual_python = os.path.join(self.virtual_dir, "Scripts", "python.exe")

    def pip_install(self, package):
        try:
            __import__(package)
        except:
            subprocess.call([sys.executable, "-m", "pip", "install", package, "--upgrade"])



pathToScriptDir = os.path.dirname(os.path.realpath(sys.argv[0]))
app = App(os.path.join(pathToScriptDir, "virtual_env_test_1"))
app.pip_install("pandas")
app.pip_install("snscrape")
app.pip_install("vaderSentiment")


# import pandas as pd
# d = {'col1': [1, 8], 'col2': [3, 4]}
# df = pd.DataFrame(data=d).to_json()
# print(df)

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



# Get number count of different type of tweets
df1 = pd.DataFrame(0, index = stockNames, columns=['Pos Count', 'Neut Count', 'Neg Count', 'Total Score'] )
for index, row in df.iterrows():
  score = row.Sentiment['compound']
  if (score < -0.05):
    df1.at[index[0], 'Neg Count'] += 1
  elif (score < 0.05):
    df1.at[index[0], 'Neut Count'] += 1
  else:
    df1.at[index[0], 'Pos Count'] += 1

  df1.at[index[0], 'Total Score'] += score

# Get weighted average total score 
for stockName in stockNames:
   df1.at[stockName, 'Total Score'] = df1.at[stockName, 'Total Score'] / (df1.at[stockName, 'Neg Count'] + df1.at[stockName, 'Neut Count'] + df1.at[stockName, 'Pos Count'])
df1