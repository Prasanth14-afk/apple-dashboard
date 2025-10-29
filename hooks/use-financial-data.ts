'use client';

import { useQuery } from '@tanstack/react-query';
import { loadAllCSVData, blendFinancialData } from '@/lib/data-loader';
import { cacheFinancialData, getCachedData, cacheBlendedData, getBlendedData } from '@/lib/db';
import type { BlendedFinancialData } from '@/lib/types';

export function useFinancialData() {
  return useQuery({
    queryKey: ['financial-data'],
    queryFn: async (): Promise<BlendedFinancialData[]> => {
      // Try to get cached data first
      const cachedBlended = await getBlendedData();
      if (cachedBlended.length > 0) {
        return cachedBlended;
      }

      // Load from CSVs
      const data = await loadAllCSVData();
      
      // Cache raw data
      await cacheFinancialData(
        data.incomeStatements,
        data.balanceSheets,
        data.cashFlows,
        data.financialRatios,
        data.keyMetrics
      );

      // Blend data
      const blended = blendFinancialData(
        data.incomeStatements,
        data.balanceSheets,
        data.cashFlows,
        data.financialRatios,
        data.keyMetrics
      );

      // Cache blended data
      await cacheBlendedData(blended);

      return blended;
    },
    staleTime: Infinity, // Data doesn't change
  });
}
