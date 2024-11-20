import React, { useEffect, useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle, RefreshCcw, AlertCircle } from 'lucide-react';
import PriceCard from './PriceCard';
import PredictionChart from './PredictionChart';
import StatusIndicator from './StatusIndicator';
import ErrorBoundary from './ErrorBoundary';

interface PredictionData {
  symbol: string;
  current_price: number;
  predicted_price: number;
  prediction_change: number;
  prediction_change_percent: number;
}

function StockPrediction() {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const getPrediction = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPrediction(data);
      setError(null);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setError('Error fetching prediction. Please check if the server is running and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrediction();
    const interval = setInterval(getPrediction, 5000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <p className="text-red-400 font-medium">{error}</p>
        </div>
        <button
          onClick={getPrediction}
          className="mx-auto block px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <RefreshCcw className="h-5 w-5 animate-spin text-emerald-400" />
        <span className="text-slate-400">Loading prediction...</span>
      </div>
    );
  }

  if (!prediction) return null;

  const isPositiveChange = prediction.prediction_change >= 0;

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-200">
                {prediction.symbol}
              </h2>
              <StatusIndicator lastUpdated={lastUpdated} />
            </div>
            {isPositiveChange ? (
              <ArrowUpCircle className="h-6 w-6 text-emerald-400" />
            ) : (
              <ArrowDownCircle className="h-6 w-6 text-red-400" />
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <PriceCard
              title="Current Price"
              value={prediction.current_price}
              type="current"
            />
            <PriceCard
              title="Predicted Price"
              value={prediction.predicted_price}
              type="predicted"
            />
          </div>

          <PredictionChart prediction={prediction} />

          <div className="mt-6 p-4 rounded-lg bg-slate-900/50">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Predicted Change</span>
              <div className="text-right">
                <span className={`text-lg font-semibold ${isPositiveChange ? 'text-emerald-400' : 'text-red-400'}`}>
                  ${Math.abs(prediction.prediction_change).toFixed(2)}
                </span>
                <span className={`ml-2 text-sm ${isPositiveChange ? 'text-emerald-400/70' : 'text-red-400/70'}`}>
                  ({prediction.prediction_change_percent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default StockPrediction;