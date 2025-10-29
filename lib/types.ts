export interface IncomeStatement {
  date: string;
  symbol: string;
  calendarYear: number;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  netIncome: number;
  eps: number;
  epsdiluted: number;
  operatingIncome: number;
  grossProfitRatio: number;
}

export interface BalanceSheet {
  date: string;
  symbol: string;
  calendarYear: number;
  cashAndCashEquivalents: number;
  totalCurrentAssets: number;
  totalAssets: number;
  totalCurrentLiabilities: number;
  totalLiabilities: number;
  totalStockholdersEquity: number;
  totalDebt: number;
}

export interface CashFlow {
  date: string;
  symbol: string;
  calendarYear: number;
  operatingCashFlow: number;
  capitalExpenditure: number;
  freeCashFlow: number;
  dividendsPaid: number;
}

export interface FinancialRatios {
  date: string;
  symbol: string;
  calendarYear: number;
  currentRatio: number;
  quickRatio: number;
  cashRatio: number;
  debtRatio: number;
  debtEquityRatio: number;
  returnOnAssets: number;
  returnOnEquity: number;
  returnOnCapitalEmployed: number;
  netProfitMargin: number;
  operatingProfitMargin: number;
  grossProfitMargin: number;
  assetTurnover: number;
  longTermDebtToCapitalization: number;
}

export interface KeyMetrics {
  date: string;
  symbol: string;
  calendarYear: number;
  revenuePerShare: number;
  netIncomePerShare: number;
  freeCashFlowPerShare: number;
  cashPerShare: number;
  bookValuePerShare: number;
  peRatio: number;
  priceToSalesRatio: number;
  pbRatio: number;
  pfcfRatio: number;
  pocfratio: number;
  enterpriseValueOverEBITDA: number;
  marketCap: number;
  enterpriseValue: number;
}

export interface BlendedFinancialData {
  date: string;
  calendarYear: number;
  
  // Income Statement
  revenue: number;
  netIncome: number;
  operatingIncome: number;
  grossProfit: number;
  eps: number;
  
  // Balance Sheet
  totalAssets: number;
  totalDebt: number;
  totalStockholdersEquity: number;
  totalCurrentAssets: number;
  totalCurrentLiabilities: number;
  cashAndCashEquivalents: number;
  
  // Cash Flow
  freeCashFlow: number;
  operatingCashFlow: number;
  capitalExpenditure: number;
  
  // Ratios
  currentRatio: number;
  quickRatio: number;
  cashRatio: number;
  returnOnAssets: number;
  returnOnEquity: number;
  grossProfitMargin: number;
  netProfitMargin: number;
  operatingProfitMargin: number;
  
  // Key Metrics
  marketCap: number;
  enterpriseValue: number;
  peRatio: number;
  pbRatio: number;
  priceToSalesRatio: number;
  
  // Calculated
  profitMargin: number;
  operatingMargin: number;
  fcfMargin: number;
  debtToEquity: number;
  workingCapital: number;
  revenueGrowthYoY: number;
  epsGrowthYoY: number;
}

export interface DateRange {
  start: number;
  end: number;
}

export interface FilterState {
  dateRange: DateRange;
  fiscalCalendarToggle: 'fiscal' | 'calendar';
  selectedYears: number[];
}
