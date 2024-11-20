from data_fetcher import fetch_stock_data
from preprocessor import preprocess_data
from model import StockPredictor
import joblib

def train_model(symbol):
    try:
        # Fetch historical data
        print(f"Fetching historical data for {symbol}...")
        df = fetch_stock_data(symbol)
        print(f"Fetched data shape: {df.shape}")

        # Preprocess data
        print("Preprocessing data...")
        X, y, scaler = preprocess_data(df)

        # Train model
        print("Training model...")
        predictor = StockPredictor()
        predictor.train(X, y)

        # Save model and scaler
        print("Saving model and scaler...")
        predictor.save_model(f"{symbol}_model.joblib")
        joblib.dump(scaler, f"{symbol}_scaler.joblib")

        print("Model training completed successfully.")
    except Exception as e:
        print(f"An error occurred during model training: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    train_model("AAPL")  # Train model for Apple stock