'use client';

import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/utils';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface KPICardProps {
  title: string;
  value: number;
  format: 'currency' | 'percent' | 'number';
  change?: number;
  sparklineData?: { value: number }[];
}

export function KPICard({ title, value, format, change, sparklineData }: KPICardProps) {
  const formattedValue =
    format === 'currency'
      ? formatCurrency(value)
      : format === 'percent'
      ? formatPercent(value)
      : formatNumber(value);

  const isPositive = change !== undefined && change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium text-gray-500">{title}</div>
        
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-bold text-gray-900">{formattedValue}</div>
          
          {change !== undefined && (
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                isPositive
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {isPositive ? (
                <ArrowUp className="w-3 h-3" />
              ) : (
                <ArrowDown className="w-3 h-3" />
              )}
              {Math.abs(change).toFixed(1)}%
            </div>
          )}
        </div>

        {sparklineData && sparklineData.length > 0 && (
          <div className="h-12 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </motion.div>
  );
}
