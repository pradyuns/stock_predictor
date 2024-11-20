import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

interface PriceCardProps {
  title: string;
  value: number;
  type: 'current' | 'predicted';
}

function PriceCard({ title, value, type }: PriceCardProps) {
  return (
    <div className={`p-4 rounded-lg ${
      type === 'current' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-emerald-500/10 border-emerald-500/20'
    } border`}>
      <div className="flex items-center gap-2 mb-2">
        {type === 'current' ? (
          <DollarSign className="h-4 w-4 text-blue-400" />
        ) : (
          <TrendingUp className="h-4 w-4 text-emerald-400" />
        )}
        <h3 className={`text-sm font-medium ${
          type === 'current' ? 'text-blue-400' : 'text-emerald-400'
        }`}>
          {title}
        </h3>
      </div>
      <p className="text-2xl font-bold text-white">
        ${value.toFixed(2)}
      </p>
    </div>
  );
}

export default PriceCard;