import yfinance as yf
import pandas as pd 
import numpy as np
from datetime import datetime, timedelta
import pprint
import json

"""stock = yf.Ticker('SAAB-B.ST')
history_df = stock.history(period='max')
first_date = history_df.index[0]
today = pd.Timestamp.now(tz=first_date.tz)
days_difference = (today - first_date).days

def get_lists(ticker, days, sample_size, interval):
    stock = yf.Ticker(ticker)
    today =  dt.datetime.today()
    earlier_date = (today -  dt.timedelta(days=days)).strftime('%Y-%m-%d')
    today_str = today.strftime('%Y-%m-%d')
    
    stock_data = stock.history(start=earlier_date, end=today_str, interval=interval)
    resampled_stock_df = stock_data[0::sample_size]
    resampled_stock_df.index = resampled_stock_df.index.strftime('%d-%m-%Y %H:%M')
    stock_df = (resampled_stock_df[['Close']] * 1000).apply(np.floor) / 1000

    weight_output = stock_df['Close'].values.tolist()
    label_output = stock_df.index.tolist()

    weight_min = min(weight_output) / 1.2
    weight_max = max(weight_output) * 1.2

    return weight_output, label_output, weight_min, weight_max

timeframes = {
    "1W": (7, 3, '1h'),
    "1M": (30, 10, '1h'),
    "6M": (182, 60, '1h'),
    "1Y": (365, 130, '1h'),
    "2Y": (729, 260, '1h'),
    "5Y": (1825, 15, '5d'),
    "All": (days_difference, 5, '3mo')
}

results = []

for label, (days, sample, interval) in timeframes.items():
    weights, labels_list, min_val, max_val = get_lists('SAAB-B.ST', days, sample, interval)
    results.append({
        "timeframe": label,
        "weights": weights,
        "labels": labels_list,
        "min": min_val,
        "max": max_val
    })"""

with open("saved_stocks.json", "r", encoding="utf-8") as f:
    data = json.load(f)

stocks = [(
        item["Stock_Ticker"],
        item["Stock_Name"],
        item["Start_Stock_Price"],
        item["Total_Price"],
        item["Currency_Name"],
        item["Currency_Symbol"],
        item["Buy_Date"],
        item["Amount"]
    )
    for entries in data.values()
    for item in entries
]

print(stocks)

if stocks:
    print("true")