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
import {
  Shield,
  Download,
  Upload,
  Clock,
  FileArchive,
  AlertTriangle,
  Lock,
  Key,
  Activity,
  Globe,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function BackupSecurity() {
  const [autoBackup, setAutoBackup] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [ipWhitelist, setIpWhitelist] = useState(false);

  const backupHistory = [
    { id: '1', date: '2025-01-28 10:30 AM', size: '45.2 MB', status: 'completed', type: 'Auto' },
    { id: '2', date: '2025-01-27 10:30 AM', size: '44.8 MB', status: 'completed', type: 'Auto' },
    { id: '3', date: '2025-01-26 02:15 PM', size: '43.1 MB', status: 'completed', type: 'Manual' },
    { id: '4', date: '2025-01-26 10:30 AM', size: '42.9 MB', status: 'completed', type: 'Auto' },
  ];

  const loginHistory = [
    { id: '1', date: '2025-01-28 09:45 AM', ip: '192.168.1.100', location: 'Lagos, Nigeria', device: 'Chrome on Windows', status: 'success' },
    { id: '2', date: '2025-01-27 04:30 PM', ip: '192.168.1.100', location: 'Lagos, Nigeria', device: 'Chrome on Windows', status: 'success' },
    { id: '3', date: '2025-01-27 09:15 AM', ip: '41.58.123.45', location: 'Abuja, Nigeria', device: 'Safari on iPhone', status: 'success' },
    { id: '4', date: '2025-01-26 02:20 PM', ip: '102.89.33.78', location: 'Port Harcourt, Nigeria', device: 'Chrome on Android', status: 'failed' },
  ];

  const handleBackupNow = () => {
    toast.success('Starting backup...');
    setTimeout(() => {
      toast.success('Backup completed successfully');
    }, 2000);
  };

  const handleDownloadBackup = (id: string) => {
    toast.success('Downloading backup...');
  };

  const handleRestoreBackup = () => {
    toast.warning('Restore feature coming soon');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>Backup & Security</h2>
        <p className="text-muted-foreground">
          Manage data backups, security settings, and access controls
        </p>
      </div>

      {/* Backup Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileArchive className="w-5 h-5" />
            Backup Settings
          </CardTitle>
          <CardDescription>
            Configure automatic backups to protect your business data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Auto Backup Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Backups</Label>
              <p className="text-sm text-muted-foreground">
                Automatically backup your data on a schedule
              </p>
            </div>
            <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
          </div>

          <Separator />

          {/* Backup Frequency */}
          <div className="grid gap-2">
            <Label htmlFor="backupFrequency">Backup Frequency</Label>
            <Select defaultValue="daily" disabled={!autoBackup}>
              <SelectTrigger id="backupFrequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Backup Time */}
          <div className="grid gap-2">
            <Label htmlFor="backupTime">Backup Time</Label>
            <Input
              id="backupTime"
              type="time"
              defaultValue="10:30"
              disabled={!autoBackup}
            />
            <p className="text-sm text-muted-foreground">
              Backups will run at this time based on your timezone
            </p>
          </div>

          {/* Retention Period */}
          <div className="grid gap-2">
            <Label htmlFor="retention">Backup Retention</Label>
            <Select defaultValue="30">
              <SelectTrigger id="retention">
                <SelectValue placeholder="Select retention period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
                <SelectItem value="forever">Forever</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Older backups will be automatically deleted
            </p>
          </div>

          <Separator />

          {/* Manual Backup */}
          <div className="space-y-3">
            <h4 className="font-medium">Manual Backup</h4>
            <p className="text-sm text-muted-foreground">
              Create an immediate backup of all your data
            </p>
            <div className="flex gap-2">
              <Button onClick={handleBackupNow} className="gap-2">
                <Download className="w-4 h-4" />
                Backup Now
              </Button>
              <Button variant="outline" onClick={handleRestoreBackup} className="gap-2">
                <Upload className="w-4 h-4" />
                Restore from Backup
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Backup History
          </CardTitle>
          <CardDescription>
            View and download previous backups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backupHistory.map((backup) => (
                <TableRow key={backup.id}>
                  <TableCell className="font-medium">{backup.date}</TableCell>
                  <TableCell>{backup.size}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{backup.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">
                      {backup.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadBackup(backup.id)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Configure advanced security options for your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                Two-Factor Authentication (2FA)
              </Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
          </div>

          {twoFactorAuth && (
            <div className="p-4 bg-muted rounded-lg space-y-3">
              <p className="text-sm">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </p>
              <div className="w-48 h-48 bg-background border rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">QR Code Placeholder</p>
              </div>
              <Input placeholder="Enter 6-digit code to verify" maxLength={6} />
              <Button size="sm">Verify & Enable 2FA</Button>
            </div>
          )}

          <Separator />

          {/* Session Timeout */}
          <div className="grid gap-2">
            <Label htmlFor="sessionTimeout">Auto Logout After Inactivity</Label>
            <Select defaultValue="30">
              <SelectTrigger id="sessionTimeout">
                <SelectValue placeholder="Select timeout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Automatically log out users after this period of inactivity
            </p>
          </div>

          <Separator />

          {/* IP Whitelist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  IP Address Whitelist
                </Label>
                <p className="text-sm text-muted-foreground">
                  Restrict access to specific IP addresses
                </p>
              </div>
              <Switch checked={ipWhitelist} onCheckedChange={setIpWhitelist} />
            </div>

            {ipWhitelist && (
              <div className="space-y-2">
                <Label htmlFor="ipAddress">Allowed IP Addresses</Label>
                <div className="flex gap-2">
                  <Input
                    id="ipAddress"
                    placeholder="e.g., 192.168.1.1"
                  />
                  <Button size="sm">Add</Button>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">192.168.1.100</span>
                    <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Login History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Login History
          </CardTitle>
          <CardDescription>
            Recent login attempts and security events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginHistory.map((login) => (
                <TableRow key={login.id}>
                  <TableCell className="font-medium">{login.date}</TableCell>
                  <TableCell className="font-mono text-sm">{login.ip}</TableCell>
                  <TableCell>{login.location}</TableCell>
                  <TableCell className="text-sm">{login.device}</TableCell>
                  <TableCell>
                    <Badge variant={login.status === 'success' ? 'default' : 'destructive'}>
                      {login.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Security Audit */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Security Audit
          </CardTitle>
          <CardDescription>
            Review security recommendations for your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <Shield className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-100">Strong Password</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your password meets security requirements
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Enable 2FA</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Two-factor authentication is not enabled. We recommend enabling it for better security.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <Shield className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-100">Regular Backups</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Automatic backups are enabled and running daily
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
