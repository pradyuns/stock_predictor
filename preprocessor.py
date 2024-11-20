import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer

def preprocess_data(df):
    print(f"Original DataFrame shape: {df.shape}")
    
    # Select features for prediction
    features = [
        'Open', 'High', 'Low', 'Close', 'Volume',
        'volume_adi', 'volume_obv', 'volume_cmf', 'volume_fi',
        'volatility_bbm', 'volatility_bbh', 'volatility_bbl', 'volatility_bbw',
        'trend_macd', 'trend_macd_signal', 'trend_macd_diff',
        'momentum_rsi', 'momentum_stoch_rsi', 'momentum_stoch_rsi_k', 'momentum_stoch_rsi_d'
    ]

    # Check if all required features are present
    missing_features = [f for f in features if f not in df.columns]
    if missing_features:
        raise ValueError(f"Missing features in DataFrame: {missing_features}")

    X = df[features]
    y = df['Close'].shift(-1)  # Predict next day's closing price

    # Remove the last row since we don't have the next day's price
    X = X[:-1]
    y = y[:-1]

    print(f"X shape before imputation: {X.shape}, y shape: {y.shape}")

    # Impute missing values
    imputer = SimpleImputer(strategy='mean')
    X_imputed = imputer.fit_transform(X)

    print(f"X shape after imputation: {X_imputed.shape}")

    # Scale the features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X_imputed)

    return X_scaled, y, scaler

def prepare_real_time_data(real_time_data, historical_data, scaler):
    # Combine real-time data with the last row of historical data
    last_historical = historical_data.iloc[-1]
    combined_data = pd.concat([last_historical, pd.Series(real_time_data)]).to_frame().T

    # Select and scale features
    features = [
        'Open', 'High', 'Low', 'Close', 'Volume',
        'volume_adi', 'volume_obv', 'volume_cmf', 'volume_fi',
        'volatility_bbm', 'volatility_bbh', 'volatility_bbl', 'volatility_bbw',
        'trend_macd', 'trend_macd_signal', 'trend_macd_diff',
        'momentum_rsi', 'momentum_stoch_rsi', 'momentum_stoch_rsi_k', 'momentum_stoch_rsi_d'
    ]
    X = combined_data[features]
    X_scaled = scaler.transform(X)

    return X_scaled