import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, RefreshCcw, TrendingUp } from 'lucide-react';
import StockPrediction from './components/StockPrediction';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-8 w-8 text-emerald-400" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
              Stock Predictor
            </h1>
          </div>
          <p className="text-slate-400">Real-time stock price predictions powered by AI</p>
        </header>
        
        <StockPrediction />
        
        <footer className="mt-12 text-center text-sm text-slate-500">
          <p>Data updates automatically every 5 seconds</p>
        </footer>
      </div>
    </div>
  );
}

export default App;