/**
 * Application Configuration
 * Centralized configuration for the Apple Financial Dashboard
 */

export const APP_CONFIG = {
  // Company Information
  company: {
    name: 'APPLE INC.',
    symbol: 'AAPL',
    description: 'Financial Analytics Dashboard',
  },

  // Color Palette
  colors: {
    primary: '#3B82F6', // Blue - Performance metrics
    success: '#10B981', // Green - Growth/positive
    danger: '#EF4444', // Red - Debt/negative
    purple: '#8B5CF6', // Purple - Valuation
    background: '#F7F7F8',
    text: {
      primary: '#1F1F1F',
      secondary: '#6B7280',
    },
  },

  // Chart Configuration
  charts: {
    defaultHeight: 300,
    animationDuration: 300,
    gridColor: '#f0f0f0',
    strokeWidth: 2,
    dotRadius: 4,
  },

  // Data Configuration
  data: {
    csvPath: '/data',
    files: {
      incomeStatement: 'income_statement.csv',
      balanceSheet: 'balance_sheet.csv',
      cashFlow: 'cash_flow.csv',
      financialRatios: 'financial_ratios.csv',
      keyMetrics: 'key_metrics.csv',
    },
    cacheExpiration: 1000 * 60 * 60 * 24, // 24 hours
  },

  // UI Configuration
  ui: {
    sidebar: {
      width: 256, // 64 * 4 = 256px (w-64 in Tailwind)
    },
    animation: {
      duration: 0.3,
      ease: 'easeInOut',
    },
    sparkline: {
      years: 5, // Number of years to show in sparklines
    },
  },

  // Navigation
  navigation: [
    {
      name: 'Executive Overview',
      href: '/',
      description: 'High-level financial performance',
    },
    {
      name: 'Financial Health',
      href: '/financial-health',
      description: 'Liquidity, leverage & cash generation',
    },
    {
      name: 'Profitability & Valuation',
      href: '/profitability',
      description: 'Returns, margins & market multiples',
    },
  ],

  // Format Configuration
  format: {
    currency: {
      locale: 'en-US',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
    percent: {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    },
  },

  // Performance Thresholds
  thresholds: {
    liquidity: {
      current: 1.0,
      quick: 0.8,
      cash: 0.3,
    },
    profitability: {
      netMargin: 0.15, // 15%
      operatingMargin: 0.20, // 20%
      roe: 0.15, // 15%
    },
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
