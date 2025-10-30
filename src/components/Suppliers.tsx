import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Truck,
  Plus,
  Search,
  Edit2,
  Trash2,
  Download,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useCurrency } from '../utils/CurrencyContext';
import { formatCurrency } from '../utils/currency';

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  country: string;
  taxId: string;
  paymentTerms: string;
  balance: number;
  totalPurchases: number;
  status: 'active' | 'inactive';
}

export function Suppliers() {
  const { currency } = useCurrency();
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      name: 'Global Supplies Inc',
      email: 'contact@globalsupplies.com',
      phone: '+234 801 234 5678',
      company: 'Global Supplies Inc',
      address: '45 Warehouse District',
      city: 'Lagos',
      country: 'Nigeria',
      taxId: 'TIN-98765432',
      paymentTerms: 'Net 30',
      balance: 1500000,
      totalPurchases: 32,
      status: 'active',
    },
    {
      id: '2',
      name: 'Tech Parts Limited',
      email: 'sales@techparts.com',
      phone: '+234 802 345 6789',
      company: 'Tech Parts Limited',
      address: '12 Industrial Avenue',
      city: 'Abuja',
      country: 'Nigeria',
      taxId: 'TIN-11223344',
      paymentTerms: 'Net 45',
      balance: 2300000,
      totalPurchases: 18,
      status: 'active',
    },
    {
      id: '3',
      name: 'Office Solutions Pro',
      email: 'info@officesolutions.com',
      phone: '+234 803 456 7890',
      company: 'Office Solutions Pro',
      address: '78 Business Park',
      city: 'Port Harcourt',
      country: 'Nigeria',
      taxId: 'TIN-55667788',
      paymentTerms: 'Net 15',
      balance: 0,
      totalPurchases: 25,
      status: 'active',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [newSupplier, setNewSupplier] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    country: 'Nigeria',
    taxId: '',
    paymentTerms: 'Net 30',
  });

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus =
      filterStatus === 'all' || supplier.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleAddSupplier = () => {
    if (!newSupplier.name || !newSupplier.email) {
      toast.error('Please fill in required fields');
      return;
    }

    const supplier: Supplier = {
      id: Date.now().toString(),
      ...newSupplier,
      balance: 0,
      totalPurchases: 0,
      status: 'active',
    };

    setSuppliers([...suppliers, supplier]);
    toast.success('Supplier added successfully');
    setIsAddDialogOpen(false);
    setNewSupplier({
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      city: '',
      country: 'Nigeria',
      taxId: '',
      paymentTerms: 'Net 30',
    });
  };

  const handleDeleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
    toast.success('Supplier deleted successfully');
  };

  const handleExport = () => {
    toast.success('Exporting suppliers to CSV...');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1>Suppliers</h1>
            <Badge variant="secondary">{suppliers.length} Total</Badge>
          </div>
          <p className="text-muted-foreground">
            Manage your supplier and vendor database
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Supplier</DialogTitle>
                <DialogDescription>
                  Enter supplier details to add them to your database
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Contact Name *</Label>
                    <Input
                      id="name"
                      value={newSupplier.name}
                      onChange={(e) =>
                        setNewSupplier({ ...newSupplier, name: e.target.value })
                      }
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      value={newSupplier.company}
                      onChange={(e) =>
                        setNewSupplier({ ...newSupplier, company: e.target.value })
                      }
                      placeholder="Global Supplies Inc"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newSupplier.email}
                      onChange={(e) =>
                        setNewSupplier({ ...newSupplier, email: e.target.value })
                      }
                      placeholder="contact@example.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newSupplier.phone}
                      onChange={(e) =>
                        setNewSupplier({ ...newSupplier, phone: e.target.value })
                      }
                      placeholder="+234 801 234 5678"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newSupplier.address}
                    onChange={(e) =>
                      setNewSupplier({ ...newSupplier, address: e.target.value })
                    }
                    placeholder="45 Warehouse District"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={newSupplier.city}
                      onChange={(e) =>
                        setNewSupplier({ ...newSupplier, city: e.target.value })
                      }
                      placeholder="Lagos"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={newSupplier.country}
                      onValueChange={(value) =>
                        setNewSupplier({ ...newSupplier, country: value })
                      }
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                        <SelectItem value="Ghana">Ghana</SelectItem>
                        <SelectItem value="South Africa">South Africa</SelectItem>
                        <SelectItem value="Kenya">Kenya</SelectItem>
                        <SelectItem value="USA">United States</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="taxId">Tax ID / GST Number</Label>
                    <Input
                      id="taxId"
                      value={newSupplier.taxId}
                      onChange={(e) =>
                        setNewSupplier({ ...newSupplier, taxId: e.target.value })
                      }
                      placeholder="TIN-98765432"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Select
                      value={newSupplier.paymentTerms}
                      onValueChange={(value) =>
                        setNewSupplier({ ...newSupplier, paymentTerms: value })
                      }
                    >
                      <SelectTrigger id="paymentTerms">
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Immediate">Immediate</SelectItem>
                        <SelectItem value="Net 7">Net 7 Days</SelectItem>
                        <SelectItem value="Net 15">Net 15 Days</SelectItem>
                        <SelectItem value="Net 30">Net 30 Days</SelectItem>
                        <SelectItem value="Net 45">Net 45 Days</SelectItem>
                        <SelectItem value="Net 60">Net 60 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSupplier}>Add Supplier</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold">{suppliers.length}</div>
            <p className="text-xs text-muted-foreground">Active vendors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payable</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold">
              {formatCurrency(suppliers.reduce((sum, s) => sum + s.balance, 0), currency)}
            </div>
            <p className="text-xs text-muted-foreground">Outstanding payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold">
              {suppliers.reduce((sum, s) => sum + s.totalPurchases, 0)}
            </div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Status</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold">
              {suppliers.filter((s) => s.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Active suppliers</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Supplier List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Suppliers</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Payment Terms</TableHead>
                <TableHead className="text-right">Payable</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Truck className="w-12 h-12 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {searchTerm
                          ? 'No suppliers found matching your search'
                          : 'No suppliers yet. Add your first supplier to get started.'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-sm text-muted-foreground">{supplier.company}</p>
                      </div>
                    </TableCell>
                    <TableCell>{supplier.company}</TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <p className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {supplier.email}
                        </p>
                        <p className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {supplier.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {supplier.city}, {supplier.country}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{supplier.paymentTerms}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(supplier.balance, currency)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={supplier.status === 'active' ? 'default' : 'secondary'}
                      >
                        {supplier.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSupplier(supplier.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
