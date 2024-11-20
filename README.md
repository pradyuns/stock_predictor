# Stock Market Predictor

This project is a real-time stock market predictor that uses machine learning to forecast stock prices. It combines a Python Flask backend for machine learning predictions with a React TypeScript frontend for displaying results.

## Project Structure

- `backend/`: Contains the Flask server and machine learning model
- `frontend/`: Houses the React TypeScript application

## Setup

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv myenv
   source myenv/bin/activate  # On Windows use `myenv\Scripts\activate`
   ```

3. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

4. Train the model:
   ```
   python trainer.py
   ```

5. Run the Flask server:
   ```
   python app.py
   ```

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open the provided URL (typically `http://localhost:5173`) in your web browser.

## How it works

1. The system fetches historical stock data and trains a Random Forest model.
2. Real-time data is fetched and processed by the Flask backend.
3. The trained model makes predictions based on the latest available data.
4. The React frontend fetches predictions from the Flask API every 5 seconds.
5. Predictions are displayed on the web interface with real-time updates.

## Technologies Used

- Backend: Python, Flask, scikit-learn, pandas, numpy
- Frontend: React, TypeScript, Tailwind CSS, Vite
- Data Source: Yahoo Finance API (via yfinance library)

## Development

- To modify the machine learning model, edit the `trainer.py` and `model.py` files in the backend directory.
- To adjust the frontend, modify the React components in the `frontend/src` directory.

Note: This predictor is for educational purposes only and should not be used for actual trading decisions.

## License

[MIT License](LICENSE)