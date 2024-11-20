import React from 'react';
import { Clock } from 'lucide-react';

interface StatusIndicatorProps {
  lastUpdated: Date;
}

function StatusIndicator({ lastUpdated }: StatusIndicatorProps) {
  const getTimeAgo = () => {
    const seconds = Math.floor((new Date().getTime() - lastUpdated.getTime()) / 1000);
    if (seconds < 10) return 'Just now';
    if (seconds < 60) return `${seconds} seconds ago`;
    return `${Math.floor(seconds / 60)} minutes ago`;
  };

  return (
    <div className="flex items-center gap-1.5 mt-1">
      <Clock className="w-3 h-3 text-slate-400" />
      <span className="text-xs text-slate-400">Updated {getTimeAgo()}</span>
    </div>
  );
}

export default StatusIndicator;