import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { FileText, Plus, Trash2, Edit2, Save, Shield } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TaxRate {
  id: string;
  name: string;
  rate: number;
  type: string;
  isDefault: boolean;
}

export function TaxConfiguration() {
  const [gstEnabled, setGstEnabled] = useState(true);
  const [defaultGstRate, setDefaultGstRate] = useState('18');
  const [taxRates, setTaxRates] = useState<TaxRate[]>([
    { id: '1', name: 'GST Standard', rate: 18, type: 'GST', isDefault: true },
    { id: '2', name: 'GST Reduced', rate: 12, type: 'GST', isDefault: false },
    { id: '3', name: 'GST Low', rate: 5, type: 'GST', isDefault: false },
    { id: '4', name: 'VAT Standard', rate: 7.5, type: 'VAT', isDefault: false },
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    toast.success('Tax configuration saved successfully');
    setIsEditing(false);
  };

  const handleAddTaxRate = () => {
    const newRate: TaxRate = {
      id: Date.now().toString(),
      name: 'New Tax Rate',
      rate: 0,
      type: 'GST',
      isDefault: false,
    };
    setTaxRates([...taxRates, newRate]);
    toast.success('New tax rate added');
  };

  const handleDeleteTaxRate = (id: string) => {
    setTaxRates(taxRates.filter(rate => rate.id !== id));
    toast.success('Tax rate deleted');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>Tax Configuration</h2>
        <p className="text-muted-foreground">
          Configure GST/VAT rates, tax rules, and compliance settings
        </p>
      </div>

      {/* General Tax Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            General Tax Settings
          </CardTitle>
          <CardDescription>
            Configure your basic tax settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* GST Enable/Disable */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable GST/VAT</Label>
              <p className="text-sm text-muted-foreground">
                Apply taxes to all transactions automatically
              </p>
            </div>
            <Switch
              checked={gstEnabled}
              onCheckedChange={setGstEnabled}
            />
          </div>

          <Separator />

          {/* Default Tax Rate */}
          <div className="grid gap-2">
            <Label htmlFor="defaultRate">Default Tax Rate</Label>
            <Select value={defaultGstRate} onValueChange={setDefaultGstRate}>
              <SelectTrigger id="defaultRate">
                <SelectValue placeholder="Select default rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0% - Exempt</SelectItem>
                <SelectItem value="5">5% - Low Rate</SelectItem>
                <SelectItem value="12">12% - Reduced Rate</SelectItem>
                <SelectItem value="18">18% - Standard Rate</SelectItem>
                <SelectItem value="28">28% - High Rate</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              This rate will be applied by default to new products and services
            </p>
          </div>

          <Separator />

          {/* Tax Registration Number */}
          <div className="grid gap-2">
            <Label htmlFor="gstNumber">GST/VAT Registration Number</Label>
            <Input
              id="gstNumber"
              placeholder="e.g., 27AABCU9603R1ZV"
              defaultValue="27AABCU9603R1ZV"
            />
            <p className="text-sm text-muted-foreground">
              Your official tax registration number (GSTIN/VAT Number)
            </p>
          </div>

          <Separator />

          {/* Tax Period */}
          <div className="grid gap-2">
            <Label htmlFor="taxPeriod">Tax Filing Period</Label>
            <Select defaultValue="monthly">
              <SelectTrigger id="taxPeriod">
                <SelectValue placeholder="Select filing period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Tax Calculation Method */}
          <div className="grid gap-2">
            <Label htmlFor="taxMethod">Tax Calculation Method</Label>
            <Select defaultValue="exclusive">
              <SelectTrigger id="taxMethod">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exclusive">Tax Exclusive (Price + Tax)</SelectItem>
                <SelectItem value="inclusive">Tax Inclusive (Price includes Tax)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Choose whether prices include tax or tax is added on top
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tax Rates Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Tax Rates
              </CardTitle>
              <CardDescription>
                Manage different tax rates for your products and services
              </CardDescription>
            </div>
            <Button onClick={handleAddTaxRate} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Tax Rate
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tax Name</TableHead>
                <TableHead>Rate (%)</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxRates.map((rate) => (
                <TableRow key={rate.id}>
                  <TableCell>{rate.name}</TableCell>
                  <TableCell>{rate.rate}%</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{rate.type}</Badge>
                  </TableCell>
                  <TableCell>
                    {rate.isDefault && (
                      <Badge variant="default">Default</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTaxRate(rate.id)}
                        disabled={rate.isDefault}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tax Exemptions */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Exemptions</CardTitle>
          <CardDescription>
            Configure tax exemption rules for specific customers or products
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Export Transactions</h4>
              <p className="text-sm text-muted-foreground">
                Automatically exempt international exports from tax
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Exempt Products</h4>
              <p className="text-sm text-muted-foreground">
                Allow marking individual products as tax-exempt
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Customer-Level Exemptions</h4>
              <p className="text-sm text-muted-foreground">
                Allow tax exemptions for specific customer accounts
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Compliance Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance & Reporting</CardTitle>
          <CardDescription>
            Configure tax compliance and reporting preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Auto-generate Tax Reports</h4>
              <p className="text-sm text-muted-foreground">
                Automatically generate tax reports at the end of each period
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Tax Reminders</h4>
              <p className="text-sm text-muted-foreground">
                Send reminders before tax filing deadlines
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reportFormat">Default Report Format</Label>
            <Select defaultValue="pdf">
              <SelectTrigger id="reportFormat">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
