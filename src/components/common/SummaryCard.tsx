import React from 'react';
import { SummaryCardData } from '../../types';

interface SummaryCardProps {
  data: SummaryCardData;
}

export function SummaryCard({ data }: SummaryCardProps) {
  const { title, value, icon, bgColor, iconBgColor, textColor, description, trend } = data;

  return (
    <div className={`${bgColor} rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start justify-between">
        {/* Left Side: Icon & Info */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            {/* Icon */}
            <div className={`${iconBgColor} w-14 h-14 rounded-lg flex items-center justify-center text-2xl`}>
              {icon}
            </div>

            {/* Title & Value */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {title}
              </p>
              <p className={`text-3xl font-bold ${textColor}`}>
                {value}
              </p>
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-500 mb-2">
              {description}
            </p>
          )}

          {/* Trend (Optional) */}
          {trend && (
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {trend.value > 0 ? '+' : ''}{trend.value}
              </span>
              <span className="text-xs text-gray-500">
                {trend.label}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}