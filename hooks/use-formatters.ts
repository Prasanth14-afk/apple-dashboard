import { useMemo } from 'react';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/utils';

export function useFormatters() {
  return useMemo(
    () => ({
      currency: formatCurrency,
      percent: formatPercent,
      number: formatNumber,
      
      // Compact number format
      compact: (value: number) => {
        return new Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
          maximumFractionDigits: 1,
        }).format(value);
      },
      
      // Full currency format
      currencyFull: (value: number) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
      },
      
      // Date format
      date: (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      },
      
      // Year format
      year: (dateString: string) => {
        return new Date(dateString).getFullYear().toString();
      },
    }),
    []
  );
}
