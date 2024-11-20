from flask import Flask, jsonify
from flask_cors import CORS
from data_fetcher import fetch_real_time_data, fetch_stock_data
from preprocessor import prepare_real_time_data
from model import StockPredictor
import joblib

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

symbol = "AAPL"  # We'll use Apple stock for this example
model = StockPredictor()
model.load_model(f"{symbol}_model.joblib")
scaler = joblib.load(f"{symbol}_scaler.joblib")

@app.route('/predict', methods=['GET'])
def predict():
    try:
        # Fetch real-time data
        real_time_data = fetch_real_time_data(symbol)

        # Fetch the latest historical data
        historical_data = fetch_stock_data(symbol, period="1d", interval="1m")

        # Prepare data for prediction
        X = prepare_real_time_data(real_time_data, historical_data, scaler)

        # Make prediction
        prediction = model.predict(X)[0]

        return jsonify({
            'symbol': symbol,
            'current_price': real_time_data['current_price'],
            'predicted_price': prediction,
            'prediction_change': prediction - real_time_data['current_price'],
            'prediction_change_percent': (prediction - real_time_data['current_price']) / real_time_data['current_price'] * 100
        })
    except Exception as e:
        print(f"Error in prediction: {str(e)}")  # Log the error
        return jsonify({'error': str(e)}), 500

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    print("Starting the Flask server...")
    print(f"Model file: {symbol}_model.joblib")
    print(f"Scaler file: {symbol}_scaler.joblib")
    app.run(debug=True, host='0.0.0.0')