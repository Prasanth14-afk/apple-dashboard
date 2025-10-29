'use client';

import { useFinancialData } from '@/hooks/use-financial-data';
import { KPICard } from '@/components/ui/kpi-card';
import { PageHeader } from '@/components/ui/page-header';
import { SnapshotTile } from '@/components/ui/snapshot-tile';
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
} from 'recharts';

export default function HomePage() {
  const { data, isLoading, error } = useFinancialData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600">Error loading data: {(error as Error).message}</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">No data available</div>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  const latest = sortedData[sortedData.length - 1];
  const previous = sortedData[sortedData.length - 2];

  // Prepare sparkline data (last 5 years)
  const recentData = sortedData.slice(-5);

  const revenueSparkline = recentData.map(d => ({ value: d.revenue }));
  const netIncomeSparkline = recentData.map(d => ({ value: d.netIncome }));
  const profitMarginSparkline = recentData.map(d => ({ value: d.profitMargin }));
  const fcfSparkline = recentData.map(d => ({ value: d.freeCashFlow }));
  const fcfMarginSparkline = recentData.map(d => ({ value: d.fcfMargin }));
  const marketCapSparkline = recentData.map(d => ({ value: d.marketCap }));

  // Calculate YoY changes
  const revenueChange = previous ? ((latest.revenue - previous.revenue) / previous.revenue) * 100 : 0;
  const netIncomeChange = previous ? ((latest.netIncome - previous.netIncome) / previous.netIncome) * 100 : 0;
  const profitMarginChange = previous ? ((latest.profitMargin - previous.profitMargin) / previous.profitMargin) * 100 : 0;
  const fcfChange = previous ? ((latest.freeCashFlow - previous.freeCashFlow) / previous.freeCashFlow) * 100 : 0;
  const fcfMarginChange = previous ? ((latest.fcfMargin - previous.fcfMargin) / previous.fcfMargin) * 100 : 0;
  const marketCapChange = previous ? ((latest.marketCap - previous.marketCap) / previous.marketCap) * 100 : 0;

  // Chart data
  const performanceData = sortedData.map(d => ({
    year: d.calendarYear,
    revenue: d.revenue / 1e9,
    netIncome: d.netIncome / 1e9,
    profitMargin: d.profitMargin * 100,
  }));

  const epsData = sortedData.map(d => ({
    year: d.calendarYear,
    eps: d.eps,
  }));

  const revenueGrowthData = sortedData.map(d => ({
    year: d.calendarYear,
    growth: d.revenueGrowthYoY,
  }));

  return (
    <div className="space-y-8">
      <PageHeader
        title="APPLE INC. — FINANCIAL ANALYTICS"
        subtitle="Executive Overview"
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          title="Revenue (Latest FY)"
          value={latest.revenue}
          format="currency"
          change={revenueChange}
          sparklineData={revenueSparkline}
        />
        <KPICard
          title="Net Income (Latest FY)"
          value={latest.netIncome}
          format="currency"
          change={netIncomeChange}
          sparklineData={netIncomeSparkline}
        />
        <KPICard
          title="Profit Margin %"
          value={latest.profitMargin}
          format="percent"
          change={profitMarginChange}
          sparklineData={profitMarginSparkline}
        />
        <KPICard
          title="Free Cash Flow"
          value={latest.freeCashFlow}
          format="currency"
          change={fcfChange}
          sparklineData={fcfSparkline}
        />
        <KPICard
          title="FCF Margin %"
          value={latest.fcfMargin}
          format="percent"
          change={fcfMarginChange}
          sparklineData={fcfMarginSparkline}
        />
        <KPICard
          title="Market Cap"
          value={latest.marketCap}
          format="currency"
          change={marketCapChange}
          sparklineData={marketCapSparkline}
        />
      </div>

      {/* Performance Charts */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Performance Trends</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue & Net Income with Profit Margin */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Revenue & Net Income vs Profit Margin
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === 'profitMargin') return [`${value.toFixed(1)}%`, 'Profit Margin'];
                    return [`$${value.toFixed(1)}B`, name === 'revenue' ? 'Revenue' : 'Net Income'];
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" name="Revenue" />
                <Bar yAxisId="left" dataKey="netIncome" fill="#10B981" name="Net Income" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="profitMargin"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  name="Profit Margin %"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* EPS Trend */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">EPS Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={epsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'EPS']} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="eps"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="EPS"
                  dot={{ fill: '#3B82F6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Growth */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Revenue Growth % (YoY)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Growth']} />
              <Legend />
              <Bar
                dataKey="growth"
                fill="#10B981"
                name="Revenue Growth %"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Snapshot Tiles */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Key Snapshots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SnapshotTile
            title="Operating Margin %"
            value={latest.operatingMargin}
            format="percent"
            color="blue"
          />
          <SnapshotTile
            title="Gross Profit"
            value={latest.grossProfit}
            format="currency"
            color="green"
          />
          <SnapshotTile
            title="Operating Income"
            value={latest.operatingIncome}
            format="currency"
            color="purple"
          />
          <SnapshotTile
            title="Enterprise Value"
            value={latest.enterpriseValue}
            format="currency"
            color="gray"
          />
        </div>
      </div>
    </div>
  );
}

