
import React from 'react';
import { User, Music, Download, Heart, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const userStats = {
    songsLiked: 24,
    songsDownloaded: 8,
    totalPlaytime: '12h 45m',
    memberSince: 'January 2024'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Music Lover</h1>
          <p className="text-slate-400">Premium Member</p>
          <Badge className="mt-2 bg-purple-600">
            Member since {userStats.memberSince}
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 p-6 text-center">
            <Heart className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{userStats.songsLiked}</h3>
            <p className="text-slate-400">Songs Liked</p>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6 text-center">
            <Download className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{userStats.songsDownloaded}</h3>
            <p className="text-slate-400">Downloads</p>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6 text-center">
            <Music className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{userStats.totalPlaytime}</h3>
            <p className="text-slate-400">Total Playtime</p>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6 text-center">
            <Settings className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">Premium</h3>
            <p className="text-slate-400">Account Type</p>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Music className="h-5 w-5 text-purple-400" />
            Recent Activity
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-slate-700">
              <span className="text-slate-300">Liked "Blinding Lights" by The Weeknd</span>
              <span className="text-slate-500 text-sm">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-700">
              <span className="text-slate-300">Downloaded "Shape of You" by Ed Sheeran</span>
              <span className="text-slate-500 text-sm">1 day ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-700">
              <span className="text-slate-300">Played "Someone Like You" by Adele</span>
              <span className="text-slate-500 text-sm">2 days ago</span>
            </div>
          </div>
        </Card>

        {/* Account Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white">
            Edit Profile
          </Button>
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white">
            Privacy Settings
          </Button>
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white">
            Subscription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
