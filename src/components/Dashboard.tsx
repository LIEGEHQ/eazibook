import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  FileText,
  Receipt,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Calculator,
  Scan,
  Sparkles,
  Lock,
  RefreshCw,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { AIInsightsCard } from './AIFeatures';
import { useCurrency } from '../utils/CurrencyContext';
import { formatCurrency } from '../utils/currency';
import { useSubscription } from '../utils/SubscriptionContext';
// import { supabase } from '../utils/supabase'; // Uncomment when Supabase is configured

interface DashboardProps {
  onQuickInvoice?: () => void;
  onQuickBilling?: () => void;
  onOCRScanner?: () => void;
}

export function Dashboard({ onQuickInvoice, onQuickBilling, onOCRScanner }: DashboardProps) {
  const { currency } = useCurrency();
  const { isPremium, usage, limits } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - Replace with real Supabase data
  const [stats, setStats] = useState([
    {
      title: 'Total Revenue',
      value: formatCurrency(1234567, currency),
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
    },
    {
      title: 'Active Customers',
      value: '1,234',
      change: '+8.2%',
      trend: 'up' as const,
      icon: Users,
    },
    {
      title: 'Inventory Items',
      value: '5,678',
      change: '-2.1%',
      trend: 'down' as const,
      icon: Package,
    },
    {
      title: 'Pending Invoices',
      value: '23',
      change: '+15.3%',
      trend: 'up' as const,
      icon: FileText,
    },
  ]);

  // Function to fetch dashboard data from Supabase
  const fetchDashboardData = async () => {
    setRefreshing(true);
    try {
      // TODO: Replace with actual Supabase queries
      // const { data: invoices } = await supabase.from('invoices').select('*');
      // const { data: customers } = await supabase.from('customers').select('*');
      // const { data: products } = await supabase.from('products').select('*');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update stats with real data here
      setStats([
        {
          title: 'Total Revenue',
          value: formatCurrency(1234567, currency),
          change: '+12.5%',
          trend: 'up' as const,
          icon: DollarSign,
        },
        {
          title: 'Active Customers',
          value: '1,234',
          change: '+8.2%',
          trend: 'up' as const,
          icon: Users,
        },
        {
          title: 'Inventory Items',
          value: '5,678',
          change: '-2.1%',
          trend: 'down' as const,
          icon: Package,
        },
        {
          title: 'Pending Invoices',
          value: '23',
          change: '+15.3%',
          trend: 'up' as const,
          icon: FileText,
        },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchDashboardData();
  }, [currency]);

  const recentActivities = [
    { id: 1, type: 'invoice', message: 'Invoice #INV-001 created for ABC Corp', time: '2 mins ago', status: 'success' },
    { id: 2, type: 'payment', message: 'Payment received from XYZ Ltd - ₹50,000', time: '15 mins ago', status: 'success' },
    { id: 3, type: 'inventory', message: 'Low stock alert: Product A (10 units left)', time: '1 hour ago', status: 'warning' },
    { id: 4, type: 'tax', message: 'GST return filed successfully', time: '2 hours ago', status: 'success' },
    { id: 5, type: 'payroll', message: 'Salary processed for 25 employees', time: '1 day ago', status: 'success' },
  ];

  const quickActions = [
    {
      title: 'Create Invoice',
      description: 'Generate a new invoice quickly',
      icon: FileText,
      action: onQuickInvoice,
      color: 'bg-muted hover:bg-accent border-border',
      iconColor: 'text-foreground',
    },
    {
      title: 'Quick Bill',
      description: 'Create and send bills instantly',
      icon: Receipt,
      action: onQuickBilling,
      color: 'bg-muted hover:bg-accent border-border',
      iconColor: 'text-foreground',
    },
    {
      title: 'AI OCR Scanner',
      description: 'Scan invoices with AI',
      icon: Scan,
      action: onOCRScanner,
      color: 'bg-muted hover:bg-accent border-border',
      iconColor: 'text-foreground',
      badge: 'AI',
    },
    {
      title: 'GST Calculator',
      description: 'Calculate GST on transactions',
      icon: Calculator,
      action: () => console.log('GST Calculator'),
      color: 'bg-muted hover:bg-accent border-border',
      iconColor: 'text-foreground',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1>Dashboard</h1>
            <Badge variant="secondary">
              EaziBook
            </Badge>
          </div>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDashboardData}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={onQuickInvoice} className="gap-2">
            <Zap className="w-4 h-4" />
            Quick Invoice
          </Button>
          <Button onClick={onQuickBilling} variant="outline" className="gap-2">
            <Receipt className="w-4 h-4" />
            Quick Bill
          </Button>
        </div>
      </div>

      {/* Subscription Status for Free Plan */}
      {!isPremium && (
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Free Plan</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    You're using {usage.invoices + usage.bills} of {limits.invoices + limits.bills} monthly transactions
                  </p>
                  <Button size="sm" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Upgrade to Premium
                  </Button>
                </div>
              </div>
              <Badge variant="secondary">Free</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md text-left ${action.color}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                  {action.badge && (
                    <Badge className="text-xs" variant="secondary">
                      {action.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="font-medium mb-1">{action.title}</h3>
                <p className="text-sm opacity-80">{action.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity and AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Overdue Invoices</span>
                <Badge variant="destructive">5</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Draft Invoices</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Paid This Month</span>
                <Badge variant="outline">₹8,45,670</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Pending Payments</span>
                <Badge variant="secondary">₹2,34,890</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <AIInsightsCard />
    </div>
  );
}