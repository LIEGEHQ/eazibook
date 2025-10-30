import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  List,
  Search,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useCurrency } from '../utils/CurrencyContext';
import { formatCurrency } from '../utils/currency';

interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  reference: string;
  customer?: string;
  supplier?: string;
  status: 'completed' | 'pending' | 'failed';
  reconciled: boolean;
}

export function Transactions() {
  const { currency } = useCurrency();
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2025-01-28',
      type: 'income',
      category: 'Sales',
      description: 'Invoice #INV-001 payment from ABC Corp',
      amount: 250000,
      paymentMethod: 'Bank Transfer',
      reference: 'TRX-2025-001',
      customer: 'ABC Corporation',
      status: 'completed',
      reconciled: true,
    },
    {
      id: '2',
      date: '2025-01-27',
      type: 'expense',
      category: 'Purchases',
      description: 'Office supplies from Global Supplies Inc',
      amount: 45000,
      paymentMethod: 'Cash',
      reference: 'TRX-2025-002',
      supplier: 'Global Supplies Inc',
      status: 'completed',
      reconciled: true,
    },
    {
      id: '3',
      date: '2025-01-27',
      type: 'income',
      category: 'Sales',
      description: 'Invoice #INV-005 payment from XYZ Ltd',
      amount: 180000,
      paymentMethod: 'Credit Card',
      reference: 'TRX-2025-003',
      customer: 'XYZ Limited',
      status: 'completed',
      reconciled: false,
    },
    {
      id: '4',
      date: '2025-01-26',
      type: 'expense',
      category: 'Utilities',
      description: 'Monthly electricity bill',
      amount: 25000,
      paymentMethod: 'Bank Transfer',
      reference: 'TRX-2025-004',
      status: 'completed',
      reconciled: true,
    },
    {
      id: '5',
      date: '2025-01-26',
      type: 'expense',
      category: 'Payroll',
      description: 'Salary payment - January 2025',
      amount: 500000,
      paymentMethod: 'Bank Transfer',
      reference: 'TRX-2025-005',
      status: 'pending',
      reconciled: false,
    },
    {
      id: '6',
      date: '2025-01-25',
      type: 'income',
      category: 'Sales',
      description: 'Invoice #INV-010 payment from Tech Solutions',
      amount: 350000,
      paymentMethod: 'Bank Transfer',
      reference: 'TRX-2025-006',
      customer: 'Tech Solutions Ltd',
      status: 'completed',
      reconciled: true,
    },
    {
      id: '7',
      date: '2025-01-24',
      type: 'expense',
      category: 'Marketing',
      description: 'Social media advertising campaign',
      amount: 75000,
      paymentMethod: 'Credit Card',
      reference: 'TRX-2025-007',
      status: 'completed',
      reconciled: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['Sales', 'Purchases', 'Utilities', 'Payroll', 'Marketing', 'Other'];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.supplier?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;

    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const totalIncome = transactions
    .filter((t) => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const netCashFlow = totalIncome - totalExpense;

  const pendingCount = transactions.filter((t) => t.status === 'pending').length;

  const handleExport = () => {
    toast.success('Exporting transactions to CSV...');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'income':
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
      case 'expense':
        return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1>Transactions</h1>
            <Badge variant="secondary">{transactions.length} Total</Badge>
          </div>
          <p className="text-muted-foreground">
            View and manage all financial transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-green-600">
              {formatCurrency(totalIncome, currency)}
            </div>
            <p className="text-xs text-muted-foreground">
              {transactions.filter((t) => t.type === 'income').length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-red-600">
              {formatCurrency(totalExpense, currency)}
            </div>
            <p className="text-xs text-muted-foreground">
              {transactions.filter((t) => t.type === 'expense').length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Cash Flow</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`font-bold ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(Math.abs(netCashFlow), currency)}
            </div>
            <p className="text-xs text-muted-foreground">
              {netCashFlow >= 0 ? 'Surplus' : 'Deficit'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List className="w-5 h-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by description, reference, customer, or supplier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income Only</SelectItem>
                  <SelectItem value="expense">Expense Only</SelectItem>
                  <SelectItem value="transfer">Transfer Only</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Transaction Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Reconciled</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <List className="w-12 h-12 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {searchTerm || filterType !== 'all' || filterStatus !== 'all' || filterCategory !== 'all'
                          ? 'No transactions found matching your filters'
                          : 'No transactions yet.'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(transaction.type)}
                        <span className="capitalize">{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        {transaction.customer && (
                          <p className="text-sm text-muted-foreground">
                            Customer: {transaction.customer}
                          </p>
                        )}
                        {transaction.supplier && (
                          <p className="text-sm text-muted-foreground">
                            Supplier: {transaction.supplier}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.category}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {transaction.reference}
                    </TableCell>
                    <TableCell className="text-sm">{transaction.paymentMethod}</TableCell>
                    <TableCell className="text-right font-medium">
                      <span
                        className={
                          transaction.type === 'income'
                            ? 'text-green-600'
                            : transaction.type === 'expense'
                            ? 'text-red-600'
                            : ''
                        }
                      >
                        {transaction.type === 'income' ? '+' : transaction.type === 'expense' ? '-' : ''}
                        {formatCurrency(transaction.amount, currency)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === 'completed'
                            ? 'default'
                            : transaction.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {transaction.reconciled ? (
                        <Badge variant="outline" className="bg-green-50">
                          ✓
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-50">
                          -
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
