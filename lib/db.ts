import Dexie, { Table } from 'dexie';
import type {
  IncomeStatement,
  BalanceSheet,
  CashFlow,
  FinancialRatios,
  KeyMetrics,
  BlendedFinancialData,
} from './types';

export class FinancialDatabase extends Dexie {
  incomeStatements!: Table<IncomeStatement>;
  balanceSheets!: Table<BalanceSheet>;
  cashFlows!: Table<CashFlow>;
  financialRatios!: Table<FinancialRatios>;
  keyMetrics!: Table<KeyMetrics>;
  blendedData!: Table<BlendedFinancialData>;

  constructor() {
    super('FinancialDatabase');
    
    this.version(1).stores({
      incomeStatements: 'date, calendarYear',
      balanceSheets: 'date, calendarYear',
      cashFlows: 'date, calendarYear',
      financialRatios: 'date, calendarYear',
      keyMetrics: 'date, calendarYear',
      blendedData: 'date, calendarYear',
    });
  }
}

export const db = new FinancialDatabase();

export async function cacheFinancialData(
  incomeStatements: IncomeStatement[],
  balanceSheets: BalanceSheet[],
  cashFlows: CashFlow[],
  financialRatios: FinancialRatios[],
  keyMetrics: KeyMetrics[]
) {
  await db.incomeStatements.clear();
  await db.balanceSheets.clear();
  await db.cashFlows.clear();
  await db.financialRatios.clear();
  await db.keyMetrics.clear();

  await db.incomeStatements.bulkAdd(incomeStatements);
  await db.balanceSheets.bulkAdd(balanceSheets);
  await db.cashFlows.bulkAdd(cashFlows);
  await db.financialRatios.bulkAdd(financialRatios);
  await db.keyMetrics.bulkAdd(keyMetrics);
}

export async function getCachedData() {
  const [
    incomeStatements,
    balanceSheets,
    cashFlows,
    financialRatios,
    keyMetrics,
  ] = await Promise.all([
    db.incomeStatements.toArray(),
    db.balanceSheets.toArray(),
    db.cashFlows.toArray(),
    db.financialRatios.toArray(),
    db.keyMetrics.toArray(),
  ]);

  return {
    incomeStatements,
    balanceSheets,
    cashFlows,
    financialRatios,
    keyMetrics,
  };
}

export async function cacheBlendedData(data: BlendedFinancialData[]) {
  await db.blendedData.clear();
  await db.blendedData.bulkAdd(data);
}

export async function getBlendedData(): Promise<BlendedFinancialData[]> {
  return await db.blendedData.toArray();
}
