'use client';

import { useFinancialData } from '@/hooks/use-financial-data';
import { PageHeader } from '@/components/ui/page-header';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  ReferenceLine,
} from 'recharts';

export default function FinancialHealthPage() {
  const { data, isLoading, error } = useFinancialData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Error or no data available</div>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  const latest = sortedData[sortedData.length - 1];

  // Liquidity ratios
  const liquidityData = sortedData.map(d => ({
    year: d.calendarYear,
    currentRatio: d.currentRatio,
    quickRatio: d.quickRatio,
    cashRatio: d.cashRatio,
  }));

  // Working capital
  const workingCapitalData = sortedData.map(d => ({
    year: d.calendarYear,
    workingCapital: d.workingCapital / 1e9,
  }));

  // Capital structure
  const capitalStructureData = sortedData.map(d => ({
    year: d.calendarYear,
    debt: d.totalDebt / 1e9,
    equity: d.totalStockholdersEquity / 1e9,
  }));

  // Debt ratios
  const debtRatiosData = sortedData.map(d => ({
    year: d.calendarYear,
    debtToEquity: d.debtToEquity,
  }));

  // Cash flow
  const cashFlowData = sortedData.map(d => ({
    year: d.calendarYear,
    operatingCF: d.operatingCashFlow / 1e9,
    freeCF: d.freeCashFlow / 1e9,
    capEx: Math.abs(d.capitalExpenditure) / 1e9,
  }));

  // Cash & investments
  const cashData = sortedData.map(d => ({
    year: d.calendarYear,
    cash: d.cashAndCashEquivalents / 1e9,
  }));

  return (
    <div className="space-y-8">
      <PageHeader
        title="Financial Health"
        subtitle="Liquidity, Leverage & Cash Generation"
      />

      {/* Liquidity Panel */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Liquidity Analysis</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Liquidity Ratios */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">
                Current, Quick & Cash Ratios
              </h3>
              <div className="flex gap-2">
                {latest.currentRatio >= 1 ? (
                  <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
                    Healthy
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold">
                    Below 1.0
                  </span>
                )}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={liquidityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: number) => value.toFixed(2)} />
                <Legend />
                <ReferenceLine y={1.0} stroke="#EF4444" strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="currentRatio"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Current Ratio"
                  dot={{ fill: '#3B82F6', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="quickRatio"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Quick Ratio"
                  dot={{ fill: '#10B981', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="cashRatio"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  name="Cash Ratio"
                  dot={{ fill: '#8B5CF6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Working Capital */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Working Capital (Billions)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workingCapitalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: number) => `$${value.toFixed(1)}B`} />
                <Legend />
                <Bar
                  dataKey="workingCapital"
                  fill="#10B981"
                  name="Working Capital"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Capital Structure Panel */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Capital Structure</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Debt vs Equity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Total Debt vs Equity (Billions)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={capitalStructureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: number) => `$${value.toFixed(1)}B`} />
                <Legend />
                <Bar dataKey="debt" fill="#EF4444" name="Total Debt" stackId="a" />
                <Bar dataKey="equity" fill="#10B981" name="Equity" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Debt to Equity Ratio */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Debt to Equity Ratio
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={debtRatiosData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: number) => value.toFixed(2)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="debtToEquity"
                  stroke="#EF4444"
                  strokeWidth={2}
                  name="Debt/Equity"
                  dot={{ fill: '#EF4444', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Cash Generation Panel */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Cash Generation</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Operating CF, Free CF & CapEx */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Cash Flows & CapEx (Billions)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: number) => `$${value.toFixed(1)}B`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="operatingCF"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Operating CF"
                  dot={{ fill: '#3B82F6', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="freeCF"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Free CF"
                  dot={{ fill: '#10B981', r: 4 }}
                />
                <Bar dataKey="capEx" fill="#8B5CF6" name="CapEx" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Cash & Investments */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Cash & Cash Equivalents (Billions)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cashData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: number) => `$${value.toFixed(1)}B`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cash"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Cash"
                  dot={{ fill: '#10B981', r: 4 }}
                  fill="#10B98133"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
