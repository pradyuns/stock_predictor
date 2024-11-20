import React from 'react';

interface PredictionChartProps {
  prediction: {
    current_price: number;
    predicted_price: number;
  };
}

function PredictionChart({ prediction }: PredictionChartProps) {
  const min = Math.min(prediction.current_price, prediction.predicted_price) * 0.995;
  const max = Math.max(prediction.current_price, prediction.predicted_price) * 1.005;
  const range = max - min;
  
  const getCurrentPosition = () => {
    return ((prediction.current_price - min) / range) * 100;
  };
  
  const getPredictedPosition = () => {
    return ((prediction.predicted_price - min) / range) * 100;
  };

  return (
    <div className="py-6">
      <div className="relative h-2 bg-slate-700 rounded-full">
        <div className="absolute w-3 h-3 bg-blue-400 rounded-full -mt-0.5 transform -translate-x-1/2"
             style={{ left: `${getCurrentPosition()}%` }}
        />
        <div className="absolute w-3 h-3 bg-emerald-400 rounded-full -mt-0.5 transform -translate-x-1/2"
             style={{ left: `${getPredictedPosition()}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-slate-400">
        <span>${min.toFixed(2)}</span>
        <span>${max.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default PredictionChart;