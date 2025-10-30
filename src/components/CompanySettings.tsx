import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload, Save, Building2, Loader2, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../utils/supabase/client';
import { CURRENCIES, DEFAULT_CURRENCY } from '../utils/currency';
import { useCurrency } from '../utils/CurrencyContext';

interface CompanySettingsData {
  companyName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  gstin: string;
  pan: string;
  logoUrl: string;
  currency: string;
}

export function CompanySettings() {
  const { setCurrency } = useCurrency();
  const [settings, setSettings] = useState<CompanySettingsData>({
    companyName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria',
    phone: '',
    email: '',
    website: '',
    gstin: '',
    pan: '',
    logoUrl: '',
    currency: DEFAULT_CURRENCY
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
     const { data, error } = await supabase
  .from('company_settings')
  .select('*')
  .single();


      if (error) throw error;

      if (data?.settings) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Error loading company settings:', error);
      toast.error('Failed to load company settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
  .from('company_settings')
  .upsert(settings, { onConflict: 'id' });


      if (error) throw error;

      setCurrency(settings.currency);
      toast.success('Company settings saved successfully');
    } catch (error) {
      console.error('Error saving company settings:', error);
      toast.error('Failed to save company settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    setIsUploadingLogo(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
  try {
    const { data, error } = await supabase.storage
      .from('company-logos')
      .upload(`logos/${file.name}`, file, { upsert: true });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from('company-logos').getPublicUrl(`logos/${file.name}`);

    setSettings({ ...settings, logoUrl: publicUrl });
    toast.success('Logo uploaded successfully');
  } catch (error) {
    console.error('Error uploading logo:', error);
    toast.error('Failed to upload logo');
  } finally {
    setIsUploadingLogo(false);
  }
};

      reader.onerror = () => {
        toast.error('Failed to read file');
        setIsUploadingLogo(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Failed to upload logo');
      setIsUploadingLogo(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1>Company Settings</h1>
        <p className="text-muted-foreground">
          Configure your business information for branded invoices and receipts
        </p>
      </div>

      <div className="space-y-6 overflow-y-auto max-h-[80vh] pr-4">
        {/* Logo Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Company Logo</CardTitle>
            <CardDescription>
              Upload your company logo. This will appear on all invoices and receipts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              {settings.logoUrl ? (
                <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden bg-muted">
                  <img
                    src={settings.logoUrl}
                    alt="Company Logo"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted">
                  <Building2 className="w-12 h-12 text-muted-foreground" />
                </div>
              )}

              <div className="flex-1">
                <Label htmlFor="logo-upload" className="cursor-pointer">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90">
                    {isUploadingLogo ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Upload Logo
                      </>
                    )}
                  </div>
                  <Input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                    disabled={isUploadingLogo}
                  />
                </Label>
                <p className="text-sm text-muted-foreground mt-2">
                  PNG, JPG or GIF. Maximum size 2MB.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                placeholder="Your Company Name"
              />
            </div>

            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="123 Business Street"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={settings.city}
                  onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                  placeholder="Lagos"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={settings.state}
                  onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                  placeholder="Lagos State"
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={settings.zipCode}
                  onChange={(e) => setSettings({ ...settings, zipCode: e.target.value })}
                  placeholder="100001"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                value={settings.country}
                onChange={(e) => setSettings({ ...settings, country: e.target.value })}
                placeholder="Nigeria"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  placeholder="+234 812 345 6789"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  placeholder="contact@company.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                value={settings.website}
                onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                placeholder="https://www.yourcompany.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Currency Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Currency & Regional Settings
            </CardTitle>
            <CardDescription>Select your preferred currency for all transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="currency">Default Currency *</Label>
            <Select
              value={settings.currency}
              onValueChange={(value) => setSettings({ ...settings, currency: value })}
            >
              <SelectTrigger id="currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CURRENCIES).map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{currency.symbol}</span>
                      <span>{currency.name}</span>
                      <span className="text-muted-foreground">({currency.code})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Tax Information */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Information</CardTitle>
            <CardDescription>Optional - Configure based on your region</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gstin">Tax ID / VAT / GST Number</Label>
                <Input
                  id="gstin"
                  value={settings.gstin}
                  onChange={(e) => setSettings({ ...settings, gstin: e.target.value })}
                  placeholder="Enter your tax identification number"
                />
              </div>
              <div>
                <Label htmlFor="pan">Additional Tax Number</Label>
                <Input
                  id="pan"
                  value={settings.pan}
                  onChange={(e) => setSettings({ ...settings, pan: e.target.value })}
                  placeholder="e.g., PAN, TIN, etc."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
