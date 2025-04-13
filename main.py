import yfinance as yf
import datetime as dt
import os
from yahooquery import search
from flask import Flask, render_template, request
import json
from flask import Flask, render_template, request, jsonify
from yahooquery import search
from flask import redirect, url_for

app = Flask(__name__, static_folder="static")

def search_stock(partial_name):
    """Search for stock tickers, names, prices, and correct currency."""
    result = search(partial_name)
    tickers_info = []

    if "quotes" in result:
        for item in result["quotes"]:
            symbol = item["symbol"]
            name = item.get("shortname", "Unknown")

            # Fetch stock price and currency using yfinance
            try:
                stock = yf.Ticker(symbol)
                stock_info = stock.info

                stock_price = stock_info.get("regularMarketPrice")  # Real-time price
                if stock_price is None:
                    stock_price = stock.history(period="1d")["Close"].iloc[-1]  # Fallback to last close
                
                stock_price = round(stock_price, 3)  # Round price
                stock_currency = stock_info.get("currency", "Unknown")  # Get correct currency
                
            except Exception:
                stock_price = "N/A"
                stock_currency = "Unknown"

            tickers_info.append((symbol, name, stock_price, stock_currency))
    
    return tickers_info


@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")

@app.route("/search", methods=["POST"])
def search_route():
    query = request.form.get("query", "").strip()
    tickers = search_stock(query) if query else []
    return render_template("results.html", tickers=tickers)

@app.route("/register_stock", methods=["POST"])
def register_stock():
    stock_ticker = request.form.get("ticker")
    stock_price = request.form.get("stockPrice")
    stock_name = request.form.get("stockName")

    stock = yf.Ticker(stock_ticker)
    stock_info = stock.info
    stock_currency = stock_info.get("currency", "Unknown")
    
    print(f"Registering stock: {stock_ticker}, {stock_price}, {stock_name}, {stock_currency}")
    return jsonify({ 
    "redirect": url_for("add_stock", stock_name=stock_name, stock_ticker=stock_ticker)
    })
    

@app.route('/add_stock')
def add_stock():
    stock_name = request.args.get("stock_name", "Unknown Stock")
    stock_ticker = request.args.get("stock_ticker", "Unknown Ticker")
    return render_template("add.html", stock_name=stock_name, stock_ticker=stock_ticker)


"""@app.route("/add_stock", methods=["POST"])
def add_stock():
    ticker = request.form.get("ticker")
    stock_price = request.form.get("stockPrice")
    stock_name = request.form.get("stockName")

    stock = yf.Ticker(ticker)
    stock_info = stock.info
    stock_currency = stock_info.get("currency", "Unknown")

    print(ticker, stock_price, stock_name, stock_currency)

    if os.path.exists("saved_stocks.json"):
        with open("saved_stocks.json", "r") as file:
            try:
                saved_stocks = json.load(file)
            except json.JSONDecodeError:
                saved_stocks = {}
    else:
        saved_stocks = {}

    if stock_name not in saved_stocks:
        saved_stocks[stock_name] = []


    if not any(stock['Ticker'] == ticker for stock in saved_stocks[stock_name]):
        saved_stocks[stock_name].append({
            "Ticker": ticker,
            "Start_Stock_Price": stock_price,
            "Stock_currency": stock_currency,
        })
    
    with open("saved_stocks.json",'w') as file:
        json.dump(saved_stocks, file, indent=4)
    
    return jsonify({"success": True, "message": f"{ticker} added successfully"})"""
    

# Get historical market data for a specific date range
buy_date = "2022-01-01"
end_date = dt.datetime.today().strftime('%Y-%m-%d')


if __name__ == "__main__":
    app.run(debug=True)
