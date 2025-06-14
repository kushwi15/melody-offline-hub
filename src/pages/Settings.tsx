
import React, { useState } from 'react';
import { Settings as SettingsIcon, Volume2, Download, Bell, Moon, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  const [volume, setVolume] = useState([80]);
  const [settings, setSettings] = useState({
    notifications: true,
    autoDownload: false,
    highQuality: true,
    darkMode: true,
    autoPlay: true
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-slate-400">Customize your music experience</p>
        </div>

        <div className="space-y-6">
          {/* Audio Settings */}
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-purple-400" />
              Audio Settings
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Default Volume</Label>
                <div className="px-3">
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                <p className="text-sm text-slate-400">Volume: {volume[0]}%</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">High Quality Audio</Label>
                  <p className="text-sm text-slate-400">Stream music in higher bitrate</p>
                </div>
                <Switch
                  checked={settings.highQuality}
                  onCheckedChange={(checked) => handleSettingChange('highQuality', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Auto Play</Label>
                  <p className="text-sm text-slate-400">Automatically play next song</p>
                </div>
                <Switch
                  checked={settings.autoPlay}
                  onCheckedChange={(checked) => handleSettingChange('autoPlay', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label>Audio Quality</Label>
                <Select defaultValue="high">
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (96 kbps)</SelectItem>
                    <SelectItem value="normal">Normal (128 kbps)</SelectItem>
                    <SelectItem value="high">High (320 kbps)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Download Settings */}
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Download className="h-5 w-5 text-green-400" />
              Download Settings
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Auto Download Liked Songs</Label>
                  <p className="text-sm text-slate-400">Automatically download songs you like</p>
                </div>
                <Switch
                  checked={settings.autoDownload}
                  onCheckedChange={(checked) => handleSettingChange('autoDownload', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label>Download Quality</Label>
                <Select defaultValue="high">
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal (128 kbps)</SelectItem>
                    <SelectItem value="high">High (320 kbps)</SelectItem>
                    <SelectItem value="lossless">Lossless</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Storage Location</Label>
                <Select defaultValue="browser">
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="browser">Browser Storage</SelectItem>
                    <SelectItem value="device">Device Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-400" />
              Notifications
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-slate-400">Get notified about new releases</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                />
              </div>
            </div>
          </Card>

          {/* Privacy & Security */}
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              Privacy & Security
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Profile Visibility</Label>
                <Select defaultValue="private">
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="friends">Friends Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Data Sharing</Label>
                <Select defaultValue="minimal">
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Sharing</SelectItem>
                    <SelectItem value="limited">Limited Sharing</SelectItem>
                    <SelectItem value="minimal">Minimal Sharing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* About */}
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-slate-400" />
              About
            </h2>

            <div className="space-y-2 text-slate-400">
              <p>MusicStream App v1.0.0</p>
              <p>© 2024 MusicStream. All rights reserved.</p>
              <p>Built with React, TypeScript, and Tailwind CSS</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
