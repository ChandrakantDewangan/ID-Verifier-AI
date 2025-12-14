import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { VerificationResult } from '../types';

interface ResultCardProps {
  result: VerificationResult;
  expectedType: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, expectedType }) => {
  const { isValid, confidence, reason, detectedType } = result;

  const isHighConfidence = confidence > 0.8;
  const isMediumConfidence = confidence > 0.5 && confidence <= 0.8;
  
  // Determine color theme based on validity and confidence
  let themeColor = 'red';
  let Icon = XCircle;
  let title = 'Verification Failed';

  if (isValid) {
    if (isHighConfidence) {
      themeColor = 'green';
      Icon = ShieldCheck;
      title = 'Verification Successful';
    } else {
      themeColor = 'yellow';
      Icon = AlertTriangle;
      title = 'Verification Uncertain';
    }
  }

  const colorClasses = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: 'text-green-600',
      bar: 'bg-green-600'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: 'text-yellow-600',
      bar: 'bg-yellow-500'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'text-red-600',
      bar: 'bg-red-600'
    }
  }[themeColor];

  return (
    <div className={`mt-6 w-full overflow-hidden rounded-xl border ${colorClasses.border} ${colorClasses.bg} p-6 shadow-sm transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-4`}>
      <div className="flex items-start gap-4">
        <div className={`rounded-full p-2 bg-white shadow-sm ${colorClasses.icon}`}>
          <Icon size={32} />
        </div>
        
        <div className="flex-1">
          <h3 className={`text-lg font-bold ${colorClasses.text} mb-1`}>
            {title}
          </h3>
          <p className="text-gray-700 mb-4">{reason}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/60 rounded-lg p-3">
              <span className="block text-gray-500 mb-1">Expected Type</span>
              <span className="font-semibold text-gray-800">{expectedType}</span>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <span className="block text-gray-500 mb-1">AI Detected</span>
              <span className="font-semibold text-gray-800">{detectedType}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-end mb-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Confidence Score</span>
              <span className={`text-sm font-bold ${colorClasses.icon}`}>{(confidence * 100).toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
              <div 
                className={`h-full rounded-full ${colorClasses.bar} transition-all duration-1000 ease-out`} 
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};