'use client';

import { useFinancialData } from '@/hooks/use-financial-data';
import { PageHeader } from '@/components/ui/page-header';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function ProfitabilityPage() {
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
  const previous = sortedData[sortedData.length - 2];

  // Radar chart data (latest year)
  const radarData = [
    {
      metric: 'Gross Margin',
      value: latest.grossProfitMargin * 100,
    },
    {
      metric: 'Operating Margin',
      value: latest.operatingProfitMargin * 100,
    },
    {
      metric: 'Net Margin',
      value: latest.netProfitMargin * 100,
    },
    {
      metric: 'ROA',
      value: latest.returnOnAssets * 100,
    },
    {
      metric: 'ROE',
      value: latest.returnOnEquity * 100,
    },
  ];

  // Margin trends
  const marginData = sortedData.map(d => ({
    year: d.calendarYear,
    netMargin: d.netProfitMargin * 100,
    operatingMargin: d.operatingProfitMargin * 100,
  }));

  // Returns
  const returnsData = sortedData.map(d => ({
    year: d.calendarYear,
    roe: d.returnOnEquity * 100,
    roa: d.returnOnAssets * 100,
  }));

  // Valuation multiples
  const valuationData = sortedData.map(d => ({
    year: d.calendarYear,
    pe: d.peRatio,
    pb: d.pbRatio,
    ps: d.priceToSalesRatio,
  }));

  // EPS Growth
  const epsGrowthData = sortedData.map(d => ({
    year: d.calendarYear,
    growth: d.epsGrowthYoY,
  }));

  const epsGrowthChange = previous ? latest.epsGrowthYoY - previous.epsGrowthYoY : 0;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Profitability & Valuation"
        subtitle="Returns, Margins & Market Multiples"
      />

      {/* Profitability Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Profitability Metrics</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Profitability Profile (Latest FY)
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 'auto']} />
                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                <Radar
                  name="Metrics"
                  dataKey="value"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Net vs Operating Margin */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Net vs Operating Margin Trends
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={marginData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="netMargin"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Net Margin"
                  dot={{ fill: '#10B981', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="operatingMargin"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Operating Margin"
                  dot={{ fill: '#3B82F6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Returns & Valuation Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Returns & Valuation</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ROE & ROA */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Return on Equity & Assets
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={returnsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="roe"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  name="ROE"
                  dot={{ fill: '#8B5CF6', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="roa"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="ROA"
                  dot={{ fill: '#3B82F6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Valuation Multiples */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              P/E, P/B & P/S Ratios
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={valuationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: number) => value.toFixed(2)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pe"
                  stroke="#EF4444"
                  strokeWidth={2}
                  name="P/E Ratio"
                  dot={{ fill: '#EF4444', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="pb"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  name="P/B Ratio"
                  dot={{ fill: '#8B5CF6', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="ps"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="P/S Ratio"
                  dot={{ fill: '#10B981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* EPS Growth */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">
                EPS Growth % (YoY)
              </h3>
              {epsGrowthChange !== 0 && (
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    epsGrowthChange >= 0
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {epsGrowthChange >= 0 ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  {Math.abs(epsGrowthChange).toFixed(1)}%
                </div>
              )}
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={epsGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="EPS Growth %"
                  dot={{ fill: '#10B981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Key Metrics Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-6">
              Latest Valuation Metrics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">P/E Ratio</span>
                <span className="text-lg font-bold text-gray-900">
                  {latest.peRatio.toFixed(2)}
                </span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">P/B Ratio</span>
                <span className="text-lg font-bold text-gray-900">
                  {latest.pbRatio.toFixed(2)}
                </span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">P/S Ratio</span>
                <span className="text-lg font-bold text-gray-900">
                  {latest.priceToSalesRatio.toFixed(2)}
                </span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ROE</span>
                <span className="text-lg font-bold text-gray-900">
                  {(latest.returnOnEquity * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ROA</span>
                <span className="text-lg font-bold text-gray-900">
                  {(latest.returnOnAssets * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
