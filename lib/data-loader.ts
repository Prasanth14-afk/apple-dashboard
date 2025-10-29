import Papa from 'papaparse';
import {
  incomeStatementSchema,
  balanceSheetSchema,
  cashFlowSchema,
  financialRatiosSchema,
  keyMetricsSchema,
} from './schemas';
import type {
  IncomeStatement,
  BalanceSheet,
  CashFlow,
  FinancialRatios,
  KeyMetrics,
  BlendedFinancialData,
} from './types';

export async function parseCSV<T>(
  csvText: string,
  schema: any
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const validated = results.data.map((row) => schema.parse(row));
          resolve(validated);
        } catch (error) {
          reject(error);
        }
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
}

export async function loadAllCSVData() {
  try {
    const [isText, bsText, cfText, frText, kmText] = await Promise.all([
      fetch('/data/income_statement.csv').then((r) => r.text()),
      fetch('/data/balance_sheet.csv').then((r) => r.text()),
      fetch('/data/cash_flow.csv').then((r) => r.text()),
      fetch('/data/financial_ratios.csv').then((r) => r.text()),
      fetch('/data/key_metrics.csv').then((r) => r.text()),
    ]);

    const [incomeStatements, balanceSheets, cashFlows, financialRatios, keyMetrics] =
      await Promise.all([
        parseCSV<IncomeStatement>(isText, incomeStatementSchema),
        parseCSV<BalanceSheet>(bsText, balanceSheetSchema),
        parseCSV<CashFlow>(cfText, cashFlowSchema),
        parseCSV<FinancialRatios>(frText, financialRatiosSchema),
        parseCSV<KeyMetrics>(kmText, keyMetricsSchema),
      ]);

    return {
      incomeStatements,
      balanceSheets,
      cashFlows,
      financialRatios,
      keyMetrics,
    };
  } catch (error) {
    console.error('Error loading CSV data:', error);
    throw error;
  }
}

export function blendFinancialData(
  incomeStatements: IncomeStatement[],
  balanceSheets: BalanceSheet[],
  cashFlows: CashFlow[],
  financialRatios: FinancialRatios[],
  keyMetrics: KeyMetrics[]
): BlendedFinancialData[] {
  // Create a map for quick lookup
  const isMap = new Map(incomeStatements.map((item) => [item.date, item]));
  const bsMap = new Map(balanceSheets.map((item) => [item.date, item]));
  const cfMap = new Map(cashFlows.map((item) => [item.date, item]));
  const frMap = new Map(financialRatios.map((item) => [item.date, item]));
  const kmMap = new Map(keyMetrics.map((item) => [item.date, item]));

  // Get all unique dates
  const allDates = Array.from(
    new Set([
      ...incomeStatements.map((i) => i.date),
      ...balanceSheets.map((b) => b.date),
      ...cashFlows.map((c) => c.date),
      ...financialRatios.map((f) => f.date),
      ...keyMetrics.map((k) => k.date),
    ])
  ).sort();

  const blended: BlendedFinancialData[] = [];

  for (let i = 0; i < allDates.length; i++) {
    const date = allDates[i];
    const is = isMap.get(date);
    const bs = bsMap.get(date);
    const cf = cfMap.get(date);
    const fr = frMap.get(date);
    const km = kmMap.get(date);

    if (!is || !bs || !cf || !fr || !km) continue;

    // Calculate derived metrics
    const profitMargin = is.revenue !== 0 ? is.netIncome / is.revenue : 0;
    const operatingMargin = is.revenue !== 0 ? is.operatingIncome / is.revenue : 0;
    const fcfMargin = is.revenue !== 0 ? cf.freeCashFlow / is.revenue : 0;
    const debtToEquity =
      bs.totalStockholdersEquity !== 0
        ? bs.totalDebt / bs.totalStockholdersEquity
        : 0;
    const workingCapital = bs.totalCurrentAssets - bs.totalCurrentLiabilities;

    // Calculate YoY growth
    let revenueGrowthYoY = 0;
    let epsGrowthYoY = 0;

    if (i > 0) {
      const prevDate = allDates[i - 1];
      const prevIs = isMap.get(prevDate);
      if (prevIs) {
        revenueGrowthYoY =
          prevIs.revenue !== 0
            ? ((is.revenue - prevIs.revenue) / prevIs.revenue) * 100
            : 0;
        epsGrowthYoY =
          prevIs.eps !== 0 ? ((is.eps - prevIs.eps) / prevIs.eps) * 100 : 0;
      }
    }

    blended.push({
      date,
      calendarYear: is.calendarYear,
      revenue: is.revenue,
      netIncome: is.netIncome,
      operatingIncome: is.operatingIncome,
      grossProfit: is.grossProfit,
      eps: is.eps,
      totalAssets: bs.totalAssets,
      totalDebt: bs.totalDebt,
      totalStockholdersEquity: bs.totalStockholdersEquity,
      totalCurrentAssets: bs.totalCurrentAssets,
      totalCurrentLiabilities: bs.totalCurrentLiabilities,
      cashAndCashEquivalents: bs.cashAndCashEquivalents,
      freeCashFlow: cf.freeCashFlow,
      operatingCashFlow: cf.operatingCashFlow,
      capitalExpenditure: cf.capitalExpenditure,
      currentRatio: fr.currentRatio,
      quickRatio: fr.quickRatio,
      cashRatio: fr.cashRatio,
      returnOnAssets: fr.returnOnAssets,
      returnOnEquity: fr.returnOnEquity,
      grossProfitMargin: fr.grossProfitMargin,
      netProfitMargin: fr.netProfitMargin,
      operatingProfitMargin: fr.operatingProfitMargin,
      marketCap: km.marketCap,
      enterpriseValue: km.enterpriseValue,
      peRatio: km.peRatio,
      pbRatio: km.pbRatio,
      priceToSalesRatio: km.priceToSalesRatio,
      profitMargin,
      operatingMargin,
      fcfMargin,
      debtToEquity,
      workingCapital,
      revenueGrowthYoY,
      epsGrowthYoY,
    });
  }

  return blended;
}
