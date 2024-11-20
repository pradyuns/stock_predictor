import yfinance as yf
import pandas as pd
from ta import add_all_ta_features

def fetch_stock_data(symbol, period="1y", interval="1d"):
    stock = yf.Ticker(symbol)
    df = stock.history(period=period, interval=interval)
    print(f"Original data shape: {df.shape}")
    print(f"Columns with NaN values: {df.columns[df.isna().any()].tolist()}")
    print(f"NaN value counts:\n{df.isna().sum()}")
    
    df = add_all_ta_features(df, open="Open", high="High", low="Low", close="Close", volume="Volume")
    print(f"Data shape after adding technical indicators: {df.shape}")
    print(f"Columns with NaN values after adding indicators: {df.columns[df.isna().any()].tolist()}")
    print(f"NaN value counts after adding indicators:\n{df.isna().sum()}")
    
    return df

def fetch_real_time_data(symbol):
    stock = yf.Ticker(symbol)
    data = stock.info
    return {
        'current_price': data['currentPrice'],
        'volume': data['volume'],
        'market_cap': data['marketCap'],
        'pe_ratio': data['trailingPE'] if 'trailingPE' in data else None,
        'dividend_yield': data['dividendYield'] if 'dividendYield' in data else None,
    }