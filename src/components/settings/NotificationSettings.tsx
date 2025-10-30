import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Bell, Mail, MessageSquare, Smartphone, Save } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSave = () => {
    toast.success('Notification settings saved successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>Notification Settings</h2>
        <p className="text-muted-foreground">
          Configure how and when you want to receive notifications
        </p>
      </div>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>
            Manage email notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Master Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <Separator />

          {/* Email Address */}
          <div className="grid gap-2">
            <Label htmlFor="notificationEmail">Notification Email Address</Label>
            <Input
              id="notificationEmail"
              type="email"
              placeholder="your@email.com"
              defaultValue="user@example.com"
              disabled={!emailNotifications}
            />
            <p className="text-sm text-muted-foreground">
              All email notifications will be sent to this address
            </p>
          </div>

          <Separator />

          {/* Email Notification Types */}
          <div className="space-y-4">
            <h4 className="font-medium">What to send</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Invoices</p>
                  <p className="text-sm text-muted-foreground">
                    New invoices, payments received, overdue reminders
                  </p>
                </div>
                <Switch defaultChecked disabled={!emailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Payments</p>
                  <p className="text-sm text-muted-foreground">
                    Payment confirmations and failed payments
                  </p>
                </div>
                <Switch defaultChecked disabled={!emailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Customers</p>
                  <p className="text-sm text-muted-foreground">
                    New customer registrations and updates
                  </p>
                </div>
                <Switch disabled={!emailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Inventory</p>
                  <p className="text-sm text-muted-foreground">
                    Low stock alerts and inventory updates
                  </p>
                </div>
                <Switch defaultChecked disabled={!emailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Tax & Compliance</p>
                  <p className="text-sm text-muted-foreground">
                    Tax filing reminders and compliance alerts
                  </p>
                </div>
                <Switch defaultChecked disabled={!emailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Payroll</p>
                  <p className="text-sm text-muted-foreground">
                    Salary processing and payroll updates
                  </p>
                </div>
                <Switch disabled={!emailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">System Updates</p>
                  <p className="text-sm text-muted-foreground">
                    New features, updates, and announcements
                  </p>
                </div>
                <Switch defaultChecked disabled={!emailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Marketing</p>
                  <p className="text-sm text-muted-foreground">
                    Tips, best practices, and promotional content
                  </p>
                </div>
                <Switch disabled={!emailNotifications} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Digest Emails */}
          <div className="space-y-3">
            <h4 className="font-medium">Digest Emails</h4>
            <p className="text-sm text-muted-foreground">
              Receive a summary of activities instead of individual emails
            </p>
            
            <div className="grid gap-2">
              <Label htmlFor="digestFrequency">Digest Frequency</Label>
              <Select defaultValue="none" disabled={!emailNotifications}>
                <SelectTrigger id="digestFrequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Digest (Send Individual Emails)</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Digest</SelectItem>
                  <SelectItem value="monthly">Monthly Digest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* In-App Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            In-App Notifications
          </CardTitle>
          <CardDescription>
            Manage notifications within the EaziBook application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Master Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable In-App Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Show notifications in the app
              </p>
            </div>
            <Switch
              checked={inAppNotifications}
              onCheckedChange={setInAppNotifications}
            />
          </div>

          <Separator />

          {/* Notification Sound */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notification Sound</Label>
              <p className="text-sm text-muted-foreground">
                Play a sound when new notifications arrive
              </p>
            </div>
            <Switch defaultChecked disabled={!inAppNotifications} />
          </div>

          {/* Desktop Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Desktop Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Show browser notifications even when app is in background
              </p>
            </div>
            <Switch disabled={!inAppNotifications} />
          </div>

          <Separator />

          {/* Notification Types */}
          <div className="space-y-4">
            <h4 className="font-medium">What to show</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Real-time Activity Updates</span>
                <Switch defaultChecked disabled={!inAppNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Payment Alerts</span>
                <Switch defaultChecked disabled={!inAppNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Customer Interactions</span>
                <Switch disabled={!inAppNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">System Alerts</span>
                <Switch defaultChecked disabled={!inAppNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">AI Insights</span>
                <Switch defaultChecked disabled={!inAppNotifications} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Auto-dismiss */}
          <div className="grid gap-2">
            <Label htmlFor="autoDismiss">Auto-dismiss After</Label>
            <Select defaultValue="5" disabled={!inAppNotifications}>
              <SelectTrigger id="autoDismiss">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 seconds</SelectItem>
                <SelectItem value="5">5 seconds</SelectItem>
                <SelectItem value="10">10 seconds</SelectItem>
                <SelectItem value="never">Never (manual dismiss)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            SMS Notifications
          </CardTitle>
          <CardDescription>
            Receive important alerts via SMS (coming soon)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Master Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive critical alerts via text message
              </p>
            </div>
            <Switch
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
              disabled
            />
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              SMS notifications are currently in development and will be available in a future
              update. You'll be able to receive critical alerts like payment confirmations and
              security notifications via text message.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Advanced Preferences
          </CardTitle>
          <CardDescription>
            Fine-tune your notification experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quiet Hours */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Do Not Disturb</Label>
                <p className="text-sm text-muted-foreground">
                  Mute notifications during specific hours
                </p>
              </div>
              <Switch />
            </div>
          </div>

          <Separator />

          {/* Priority Notifications */}
          <div className="space-y-3">
            <h4 className="font-medium">High Priority Alerts</h4>
            <p className="text-sm text-muted-foreground">
              Always notify me immediately for these events
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">Large payments received (₦100,000+)</span>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">Security alerts</span>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">Critical system errors</span>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">Tax filing deadlines</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          {/* Notification Grouping */}
          <div className="grid gap-2">
            <Label htmlFor="grouping">Notification Grouping</Label>
            <Select defaultValue="smart">
              <SelectTrigger id="grouping">
                <SelectValue placeholder="Select grouping option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Grouping</SelectItem>
                <SelectItem value="smart">Smart Grouping (Recommended)</SelectItem>
                <SelectItem value="type">Group by Type</SelectItem>
                <SelectItem value="time">Group by Time</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Smart grouping combines related notifications to reduce clutter
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Test Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Test Notifications</CardTitle>
          <CardDescription>
            Send a test notification to verify your settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => toast.success('This is a test notification!')}
            >
              Send Test In-App
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.success('Test email sent to your inbox')}
              disabled={!emailNotifications}
            >
              Send Test Email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
}
