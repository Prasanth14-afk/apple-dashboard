'use client';

import { motion } from 'framer-motion';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/utils';

interface SnapshotTileProps {
  title: string;
  value: number;
  format: 'currency' | 'percent' | 'number';
  color?: 'blue' | 'green' | 'purple' | 'gray';
}

export function SnapshotTile({ title, value, format, color = 'gray' }: SnapshotTileProps) {
  const formattedValue =
    format === 'currency'
      ? formatCurrency(value)
      : format === 'percent'
      ? formatPercent(value)
      : formatNumber(value);

  const colorClasses = {
    blue: 'bg-gray-50 border-gray-200',
    green: 'bg-gray-50 border-gray-200',
    purple: 'bg-gray-50 border-gray-200',
    gray: 'bg-gray-50 border-gray-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-xl p-5 border ${colorClasses[color]}`}
    >
      <div className="text-sm font-medium text-gray-600 mb-2">{title}</div>
      <div className="text-2xl font-bold text-gray-900">{formattedValue}</div>
    </motion.div>
  );
}
