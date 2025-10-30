import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  FileText,
  Download,
  TrendingUp,
  DollarSign,
  BarChart,
  PieChart,
  FileSpreadsheet,
  Calendar,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useCurrency } from '../utils/CurrencyContext';
import { formatCurrency } from '../utils/currency';

export function Reports() {
  const { currency } = useCurrency();
  const [dateRange, setDateRange] = useState('this-month');
  const [reportFormat, setReportFormat] = useState('pdf');

  // Mock data for reports
  const profitLossData = {
    revenue: 1250000,
    costOfSales: 750000,
    grossProfit: 500000,
    operatingExpenses: 250000,
    netProfit: 250000,
    grossProfitMargin: 40,
    netProfitMargin: 20,
  };

  const balanceSheetData = {
    assets: {
      currentAssets: 2500000,
      fixedAssets: 5000000,
      total: 7500000,
    },
    liabilities: {
      currentLiabilities: 1500000,
      longTermLiabilities: 3000000,
      total: 4500000,
    },
    equity: {
      capital: 2000000,
      retainedEarnings: 1000000,
      total: 3000000,
    },
  };

  const cashFlowData = {
    operating: 450000,
    investing: -200000,
    financing: 100000,
    netCashFlow: 350000,
    openingBalance: 1000000,
    closingBalance: 1350000,
  };

  const salesReports = [
    {
      id: '1',
      name: 'Sales by Customer',
      description: 'Breakdown of sales revenue by customer',
      icon: BarChart,
    },
    {
      id: '2',
      name: 'Sales by Product',
      description: 'Breakdown of sales revenue by product/service',
      icon: PieChart,
    },
    {
      id: '3',
      name: 'Sales by Period',
      description: 'Sales trends over time (daily, weekly, monthly)',
      icon: TrendingUp,
    },
    {
      id: '4',
      name: 'Invoice Aging Report',
      description: 'Outstanding invoices grouped by age',
      icon: Calendar,
    },
  ];

  const expenseReports = [
    {
      id: '5',
      name: 'Expenses by Category',
      description: 'Breakdown of expenses by category',
      icon: PieChart,
    },
    {
      id: '6',
      name: 'Expenses by Supplier',
      description: 'Breakdown of expenses by supplier',
      icon: BarChart,
    },
    {
      id: '7',
      name: 'Monthly Expense Trends',
      description: 'Track expense patterns over time',
      icon: TrendingUp,
    },
  ];

  const inventoryReports = [
    {
      id: '8',
      name: 'Stock Valuation',
      description: 'Current inventory value and quantities',
      icon: DollarSign,
    },
    {
      id: '9',
      name: 'Low Stock Alert',
      description: 'Products below minimum stock levels',
      icon: FileText,
    },
    {
      id: '10',
      name: 'Inventory Movement',
      description: 'Stock in and out movements',
      icon: BarChart,
    },
  ];

  const handleGenerateReport = (reportName: string) => {
    toast.success(`Generating ${reportName}...`);
    setTimeout(() => {
      toast.success(`${reportName} ready for download!`);
    }, 2000);
  };

  const handleExport = (reportType: string) => {
    toast.success(`Exporting ${reportType} as ${reportFormat.toUpperCase()}...`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1>Reports & Analytics</h1>
            <Badge variant="secondary">Business Intelligence</Badge>
          </div>
          <p className="text-muted-foreground">
            Generate comprehensive financial and business reports
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Select value={reportFormat} onValueChange={setReportFormat}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Report Tabs */}
      <Tabs defaultValue="financial" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="sales">Sales Reports</TabsTrigger>
          <TabsTrigger value="expenses">Expense Reports</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
          <TabsTrigger value="tax">Tax Reports</TabsTrigger>
        </TabsList>

        {/* Financial Reports */}
        <TabsContent value="financial" className="space-y-6">
          {/* Profit & Loss Statement */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Profit & Loss Statement
                  </CardTitle>
                  <CardDescription>
                    Income statement showing revenue, costs, and profitability
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGenerateReport('Profit & Loss Statement')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" onClick={() => handleExport('Profit & Loss')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="font-medium">Total Revenue</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(profitLossData.revenue, currency)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span>Cost of Sales</span>
                  <span className="text-red-600">
                    -{formatCurrency(profitLossData.costOfSales, currency)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2">
                  <span className="font-medium">Gross Profit</span>
                  <div className="text-right">
                    <p className="font-bold">
                      {formatCurrency(profitLossData.grossProfit, currency)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {profitLossData.grossProfitMargin}% margin
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span>Operating Expenses</span>
                  <span className="text-red-600">
                    -{formatCurrency(profitLossData.operatingExpenses, currency)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200">
                  <span className="font-medium">Net Profit</span>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {formatCurrency(profitLossData.netProfit, currency)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {profitLossData.netProfitMargin}% margin
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Balance Sheet */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5" />
                    Balance Sheet
                  </CardTitle>
                  <CardDescription>
                    Statement of financial position showing assets, liabilities, and equity
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGenerateReport('Balance Sheet')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" onClick={() => handleExport('Balance Sheet')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Assets</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span className="text-sm">Current Assets</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(balanceSheetData.assets.currentAssets, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span className="text-sm">Fixed Assets</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(balanceSheetData.assets.fixedAssets, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-primary/10 rounded border-2">
                      <span className="font-medium">Total Assets</span>
                      <span className="font-bold">
                        {formatCurrency(balanceSheetData.assets.total, currency)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Liabilities</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span className="text-sm">Current Liabilities</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(balanceSheetData.liabilities.currentLiabilities, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span className="text-sm">Long-term Liabilities</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(balanceSheetData.liabilities.longTermLiabilities, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-primary/10 rounded border-2">
                      <span className="font-medium">Total Liabilities</span>
                      <span className="font-bold">
                        {formatCurrency(balanceSheetData.liabilities.total, currency)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Equity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span className="text-sm">Capital</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(balanceSheetData.equity.capital, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span className="text-sm">Retained Earnings</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(balanceSheetData.equity.retainedEarnings, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-primary/10 rounded border-2">
                      <span className="font-medium">Total Equity</span>
                      <span className="font-bold">
                        {formatCurrency(balanceSheetData.equity.total, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cash Flow Statement */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Cash Flow Statement
                  </CardTitle>
                  <CardDescription>
                    Statement of cash inflows and outflows
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGenerateReport('Cash Flow Statement')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" onClick={() => handleExport('Cash Flow')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span>Operating Activities</span>
                  <span className="font-medium text-green-600">
                    +{formatCurrency(cashFlowData.operating, currency)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span>Investing Activities</span>
                  <span className="font-medium text-red-600">
                    {formatCurrency(cashFlowData.investing, currency)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span>Financing Activities</span>
                  <span className="font-medium text-green-600">
                    +{formatCurrency(cashFlowData.financing, currency)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2">
                  <span className="font-medium">Net Cash Flow</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(cashFlowData.netCashFlow, currency)}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Opening Balance</p>
                    <p className="font-bold">
                      {formatCurrency(cashFlowData.openingBalance, currency)}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200">
                    <p className="text-sm text-muted-foreground">Closing Balance</p>
                    <p className="font-bold text-green-600">
                      {formatCurrency(cashFlowData.closingBalance, currency)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Reports */}
        <TabsContent value="sales" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {salesReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <report.icon className="w-5 h-5" />
                    {report.name}
                  </CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleGenerateReport(report.name)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => handleExport(report.name)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Expense Reports */}
        <TabsContent value="expenses" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {expenseReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <report.icon className="w-5 h-5" />
                    {report.name}
                  </CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleGenerateReport(report.name)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => handleExport(report.name)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Inventory Reports */}
        <TabsContent value="inventory" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {inventoryReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <report.icon className="w-5 h-5" />
                    {report.name}
                  </CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleGenerateReport(report.name)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => handleExport(report.name)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tax Reports */}
        <TabsContent value="tax" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Reports</CardTitle>
              <CardDescription>
                GST/VAT returns and tax compliance reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center border-2 border-dashed rounded-lg">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground mb-4">
                  Tax reports will be available after configuring tax settings
                </p>
                <Button variant="outline">Configure Tax Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
