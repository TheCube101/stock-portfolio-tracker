import yfinance as yf
import pandas as pd 
import numpy as np
from datetime import datetime, timedelta
import pprint
import json
import os

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


def current_price(stock_ticker):
    # load the stock
    stock = yf.Ticker(stock_ticker)
    history_df = stock.history()
    price_df = history_df['Close']
    first_date = round(price_df.iloc[0], 3) # use iloc for positional arguments
    return first_date

def current_profit(start_price, current_price):
    profit = current_price - start_price
    return profit

current_price = current_price('NVO')
current_profit = current_profit(70.696, current_price)
print(current_profit)