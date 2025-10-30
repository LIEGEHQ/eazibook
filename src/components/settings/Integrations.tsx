import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import {
  Brain,
  Building2,
  CreditCard,
  Webhook,
  Check,
  X,
  Eye,
  EyeOff,
  ExternalLink,
  Plug,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Integrations() {
  const [showOpenAIKey, setShowOpenAIKey] = useState(false);
  const [openAIKey, setOpenAIKey] = useState('sk-proj-xxxxxxxxxxxxxxxx');
  const [openAIConnected, setOpenAIConnected] = useState(true);

  const handleTestConnection = (integration: string) => {
    toast.success(`Testing ${integration} connection...`);
    setTimeout(() => {
      toast.success(`${integration} connection successful!`);
    }, 1500);
  };

  const handleSaveOpenAIKey = () => {
    toast.success('OpenAI API key saved successfully');
    setOpenAIConnected(true);
  };

  const handleDisconnect = (integration: string) => {
    toast.success(`${integration} disconnected`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>Integrations</h2>
        <p className="text-muted-foreground">
          Connect EaziBook with third-party services and APIs
        </p>
      </div>

      {/* AI Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            OpenAI Integration
          </CardTitle>
          <CardDescription>
            Configure OpenAI API for AI-powered features (OCR Scanner, Chatbot, Insights)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${openAIConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <div>
                <p className="font-medium">Connection Status</p>
                <p className="text-sm text-muted-foreground">
                  {openAIConnected ? 'Connected and operational' : 'Not connected'}
                </p>
              </div>
            </div>
            <Badge variant={openAIConnected ? 'default' : 'secondary'}>
              {openAIConnected ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  Active
                </>
              ) : (
                <>
                  <X className="w-3 h-3 mr-1" />
                  Inactive
                </>
              )}
            </Badge>
          </div>

          <Separator />

          <div className="grid gap-2">
            <Label htmlFor="openaiKey">OpenAI API Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="openaiKey"
                  type={showOpenAIKey ? 'text' : 'password'}
                  value={openAIKey}
                  onChange={(e) => setOpenAIKey(e.target.value)}
                  placeholder="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowOpenAIKey(!showOpenAIKey)}
                >
                  {showOpenAIKey ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <Button onClick={handleSaveOpenAIKey}>Save</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Get your API key from{' '}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="underline inline-flex items-center gap-1"
              >
                OpenAI Platform
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Enabled Features</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">AI OCR Scanner</p>
                  <p className="text-xs text-muted-foreground">
                    Extract data from invoices and receipts
                  </p>
                </div>
                <Badge variant="outline">Premium Only</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">AI Financial Consultant</p>
                  <p className="text-xs text-muted-foreground">
                    Chat with AI for business advice
                  </p>
                </div>
                <Badge variant="outline">Premium Only</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">Business Insights</p>
                  <p className="text-xs text-muted-foreground">
                    Automated analytics and recommendations
                  </p>
                </div>
                <Badge variant="default">All Plans</Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleTestConnection('OpenAI')}>
              Test Connection
            </Button>
            {openAIConnected && (
              <Button variant="outline" onClick={() => handleDisconnect('OpenAI')}>
                Disconnect
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Gateways */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Gateways
          </CardTitle>
          <CardDescription>
            Connect payment processors to accept online payments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stripe */}
          <div className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">Stripe</h4>
                  <p className="text-sm text-muted-foreground">Accept card payments globally</p>
                </div>
              </div>
              <Badge variant="secondary">Not Connected</Badge>
            </div>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Plug className="w-4 h-4" />
              Connect Stripe
            </Button>
          </div>

          {/* PayPal */}
          <div className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">PayPal</h4>
                  <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                </div>
              </div>
              <Badge variant="secondary">Not Connected</Badge>
            </div>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Plug className="w-4 h-4" />
              Connect PayPal
            </Button>
          </div>

          {/* Razorpay */}
          <div className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">Razorpay</h4>
                  <p className="text-sm text-muted-foreground">Accept payments in India</p>
                </div>
              </div>
              <Badge variant="secondary">Not Connected</Badge>
            </div>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Plug className="w-4 h-4" />
              Connect Razorpay
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bank Connections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Bank Connections
          </CardTitle>
          <CardDescription>
            Connect your bank accounts for automatic reconciliation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Bank integration allows automatic import of bank statements and transaction
              reconciliation. This feature will be available in future updates.
            </p>
          </div>
          <Button variant="outline" disabled>
            <Plug className="w-4 h-4 mr-2" />
            Connect Bank Account (Coming Soon)
          </Button>
        </CardContent>
      </Card>

      {/* Webhooks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="w-5 h-5" />
            Webhooks
          </CardTitle>
          <CardDescription>
            Configure webhooks to send data to external applications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input
              id="webhookUrl"
              type="url"
              placeholder="https://your-domain.com/webhook"
            />
            <p className="text-sm text-muted-foreground">
              EaziBook will send POST requests to this URL for important events
            </p>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Events to Send</h4>
            <div className="space-y-2">
              {[
                'Invoice Created',
                'Invoice Paid',
                'Payment Received',
                'Customer Added',
                'Product Updated',
              ].map((event) => (
                <div key={event} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm">{event}</span>
                  <Switch />
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Test Webhook
          </Button>
        </CardContent>
      </Card>

      {/* API Access */}
      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>
            Generate API keys for custom integrations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">EaziBook API</h4>
              <Badge variant="outline">Professional+</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Build custom integrations using our RESTful API. Available for Professional
              and Premium plans.
            </p>
          </div>

          <Button variant="outline" disabled>
            Generate API Key (Professional+ Only)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
