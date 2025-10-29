import { z } from 'zod';

export const incomeStatementSchema = z.object({
  date: z.string(),
  symbol: z.string(),
  calendarYear: z.coerce.number(),
  revenue: z.coerce.number(),
  costOfRevenue: z.coerce.number(),
  grossProfit: z.coerce.number(),
  netIncome: z.coerce.number(),
  eps: z.coerce.number(),
  epsdiluted: z.coerce.number(),
  operatingIncome: z.coerce.number(),
  grossProfitRatio: z.coerce.number(),
});

export const balanceSheetSchema = z.object({
  date: z.string(),
  symbol: z.string(),
  calendarYear: z.coerce.number(),
  cashAndCashEquivalents: z.coerce.number(),
  totalCurrentAssets: z.coerce.number(),
  totalAssets: z.coerce.number(),
  totalCurrentLiabilities: z.coerce.number(),
  totalLiabilities: z.coerce.number(),
  totalStockholdersEquity: z.coerce.number(),
  totalDebt: z.coerce.number(),
});

export const cashFlowSchema = z.object({
  date: z.string(),
  symbol: z.string(),
  calendarYear: z.coerce.number(),
  operatingCashFlow: z.coerce.number(),
  capitalExpenditure: z.coerce.number(),
  freeCashFlow: z.coerce.number(),
  dividendsPaid: z.coerce.number(),
});

export const financialRatiosSchema = z.object({
  date: z.string(),
  symbol: z.string(),
  calendarYear: z.coerce.number(),
  currentRatio: z.coerce.number(),
  quickRatio: z.coerce.number(),
  cashRatio: z.coerce.number(),
  debtRatio: z.coerce.number(),
  debtEquityRatio: z.coerce.number(),
  returnOnAssets: z.coerce.number(),
  returnOnEquity: z.coerce.number(),
  returnOnCapitalEmployed: z.coerce.number(),
  netProfitMargin: z.coerce.number(),
  operatingProfitMargin: z.coerce.number(),
  grossProfitMargin: z.coerce.number(),
  assetTurnover: z.coerce.number(),
  longTermDebtToCapitalization: z.coerce.number(),
});

export const keyMetricsSchema = z.object({
  date: z.string(),
  symbol: z.string(),
  calendarYear: z.coerce.number(),
  revenuePerShare: z.coerce.number(),
  netIncomePerShare: z.coerce.number(),
  freeCashFlowPerShare: z.coerce.number(),
  cashPerShare: z.coerce.number(),
  bookValuePerShare: z.coerce.number(),
  peRatio: z.coerce.number(),
  priceToSalesRatio: z.coerce.number(),
  pbRatio: z.coerce.number(),
  pfcfRatio: z.coerce.number(),
  pocfratio: z.coerce.number(),
  enterpriseValueOverEBITDA: z.coerce.number(),
  marketCap: z.coerce.number(),
  enterpriseValue: z.coerce.number(),
});
