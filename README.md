# Apple Inc. Financial Analytics Dashboard

A production-quality, three-page web application that visualizes Apple Inc. (AAPL) financials using local CSV files with a modern tech stack.

##  Features

### Page 1 - Executive Overview
- **6 KPI Cards** with 5-year sparklines and YoY changes:
  - Revenue (Latest FY)
  - Net Income (Latest FY)
  - Profit Margin %
  - Free Cash Flow
  - FCF Margin %
  - Market Cap
- **Performance Charts**:
  - Revenue & Net Income vs Profit Margin (Combo Chart)
  - EPS Trend (Line Chart)
  - Revenue Growth % YoY (Bar Chart)
- **Snapshot Tiles**: Operating Margin, Gross Profit, Operating Income, Enterprise Value

### Page 2 - Financial Health
- **Liquidity Analysis**: Current, Quick & Cash Ratios with threshold indicators
- **Working Capital**: Historical trends
- **Capital Structure**: Debt vs Equity breakdown
- **Debt Ratios**: Debt to Equity over time
- **Cash Generation**: Operating CF, Free CF & CapEx analysis
- **Cash Position**: Cash & Cash Equivalents trend

### Page 3 - Profitability & Valuation
- **Profitability Radar**: Gross Margin, Operating Margin, Net Margin, ROA, ROE
- **Margin Trends**: Net vs Operating Margin comparison
- **Returns**: ROE & ROA over time
- **Valuation Multiples**: P/E, P/B, P/S ratios
- **EPS Growth**: Year-over-year growth tracking
- **Valuation Summary**: Latest metrics card

##  Tech Stack

- **Framework**: Next.js 16 (App Router) with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Management**: TanStack Query (React Query)
- **Validation**: Zod
- **Local Storage**: Dexie (IndexedDB)
- **CSV Parsing**: PapaParser

##  Installation

1. **Navigate to the project directory**:
   ```bash
   cd "/Users/prasanthkumar/Desktop/FINANCIAL DATA/apple-dashboard"
   ```

2. **Install dependencies** (already done):
   ```bash
   npm install
   ```

3. **CSV Files**: Already copied to `public/data/` directory

##  Running the Application

### Development Mode
```bash
npm run dev
```
Visit: http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

##  Data Sources

The application loads data from these CSV files in `/public/data/`:
- `income_statement.csv` - Revenue, net income, EPS, operating income
- `balance_sheet.csv` - Assets, liabilities, equity, debt
- `cash_flow.csv` - Operating CF, free CF, CapEx
- `financial_ratios.csv` - Liquidity ratios, profitability ratios, returns
- `key_metrics.csv` - Market cap, valuation multiples, per-share metrics

##  Key Features

### Data Processing
- **Zod Validation**: All CSV data validated with strict schemas
- **IndexedDB Caching**: Fast subsequent loads with local persistence
- **Data Blending**: Automatic joins across all CSV files by date/year
- **Calculated Metrics**: FCF Margin, Debt-to-Equity, Working Capital, YoY Growth

### UI/UX
- **Responsive Design**: Works on all screen sizes
- **Loading States**: Smooth loading animations
- **Error Handling**: Graceful error messages
- **Dark Sidebar**: Professional navigation with Apple logo
- **Color Palette**: 
  - Blue (#3B82F6) - Performance metrics
  - Green (#10B981) - Positive changes/growth
  - Red (#EF4444) - Debt/negative changes
  - Purple (#8B5CF6) - Valuation metrics

### Performance
- **Static Generation**: Pre-rendered pages for fast loading
- **Client-Side Caching**: Data cached in IndexedDB
- **Lazy Loading**: Charts rendered efficiently
- **Optimized Bundle**: Tree-shaking and code splitting

##  Project Structure

```
apple-dashboard/
├── app/
│   ├── layout.tsx              # Root layout with sidebar
│   ├── page.tsx                # Executive Overview
│   ├── financial-health/
│   │   └── page.tsx            # Financial Health page
│   └── profitability/
│       └── page.tsx            # Profitability & Valuation page
├── components/
│   ├── providers.tsx           # React Query provider
│   └── ui/
│       ├── sidebar.tsx         # Navigation sidebar
│       ├── kpi-card.tsx        # KPI card component
│       ├── page-header.tsx     # Page header component
│       └── snapshot-tile.tsx   # Snapshot tile component
├── lib/
│   ├── utils.ts                # Utility functions
│   ├── types.ts                # TypeScript interfaces
│   ├── schemas.ts              # Zod validation schemas
│   ├── db.ts                   # IndexedDB (Dexie) setup
│   └── data-loader.ts          # CSV loading & blending
├── hooks/
│   └── use-financial-data.ts   # React Query hook
├── public/
│   └── data/                   # CSV files
└── package.json
```

##  Design System

### Typography
- Headings: Bold, Gray-900 (#1F1F1F)
- Body: Inter font family
- Numbers: Compact format ($391B, 24.5%)

### Components
- **Cards**: White background, rounded-2xl, subtle shadow
- **KPIs**: Large text with sparklines and YoY chips
- **Charts**: Recharts with custom tooltips and legends
- **Tiles**: Colored backgrounds for categorization

### Accessibility
- WCAG AA contrast ratios
- Keyboard navigation
- Focus indicators
- Semantic HTML

##  Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Deploy automatically

### Manual Deployment
```bash
npm run build
```
Deploy the `.next` directory to your hosting provider.

## 📈 Future Enhancements

- [ ] Date range filters
- [ ] Export to PDF
- [ ] Cross-chart filtering
- [ ] Comparison with other companies
- [ ] Real-time data updates
- [ ] Custom chart configurations
- [ ] More detailed drill-downs

##  Troubleshooting

### CSV Loading Issues
- Ensure CSV files are in `/public/data/`
- Check browser console for parsing errors
- Verify CSV format matches schema

### Performance Issues
- Clear IndexedDB cache in browser DevTools
- Check Network tab for slow requests
- Reduce chart animation complexity

### Build Errors
- Delete `.next` folder and rebuild
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies

##  License

This project is for educational and demonstration purposes.

##  Author

Built with modern web technologies following best practices for production applications.

---

**Status**: ✅ Production Ready
**Last Updated**: October 30, 2025
