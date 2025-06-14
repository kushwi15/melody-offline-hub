
import React, { useState, useEffect } from 'react';
import { Download, Folder, Play, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface OfflineSong {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  folderName: string;
  folderImage: string;
  downloadedAt: Date;
  size: string;
}

interface OfflineLibraryProps {
  onPlaySong: (song: OfflineSong) => void;
}

const OfflineLibrary = ({ onPlaySong }: OfflineLibraryProps) => {
  const [offlineSongs, setOfflineSongs] = useState<OfflineSong[]>([]);
  const [groupedSongs, setGroupedSongs] = useState<Record<string, OfflineSong[]>>({});

  useEffect(() => {
    // Simulate loading offline songs from IndexedDB
    const mockOfflineSongs: OfflineSong[] = [
      {
        id: '1',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300',
        folderName: 'My Favorites',
        folderImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300',
        downloadedAt: new Date('2024-01-15'),
        size: '4.2 MB'
      },
      {
        id: '2',
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        coverImage: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300',
        folderName: 'Workout Mix',
        folderImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
        downloadedAt: new Date('2024-01-10'),
        size: '3.8 MB'
      },
      {
        id: '3',
        title: 'Someone Like You',
        artist: 'Adele',
        coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300',
        folderName: 'My Favorites',
        folderImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300',
        downloadedAt: new Date('2024-01-12'),
        size: '4.5 MB'
      }
    ];

    setOfflineSongs(mockOfflineSongs);

    // Group songs by folder
    const grouped = mockOfflineSongs.reduce((acc, song) => {
      if (!acc[song.folderName]) {
        acc[song.folderName] = [];
      }
      acc[song.folderName].push(song);
      return acc;
    }, {} as Record<string, OfflineSong[]>);

    setGroupedSongs(grouped);
  }, []);

  const handleDeleteSong = (songId: string) => {
    setOfflineSongs(prev => prev.filter(song => song.id !== songId));
    
    // Update grouped songs
    const newGrouped = offlineSongs
      .filter(song => song.id !== songId)
      .reduce((acc, song) => {
        if (!acc[song.folderName]) {
          acc[song.folderName] = [];
        }
        acc[song.folderName].push(song);
        return acc;
      }, {} as Record<string, OfflineSong[]>);
    
    setGroupedSongs(newGrouped);
  };

  const getTotalStorage = () => {
    const totalMB = offlineSongs.reduce((total, song) => {
      const size = parseFloat(song.size.replace(' MB', ''));
      return total + size;
    }, 0);
    return totalMB.toFixed(1);
  };

  if (offlineSongs.length === 0) {
    return (
      <div className="text-center py-12">
        <Download className="h-16 w-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No Offline Songs</h3>
        <p className="text-slate-400">Download songs to enjoy them offline</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Storage Info */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Offline Storage</h3>
              <p className="text-purple-100">
                {offlineSongs.length} songs • {getTotalStorage()} MB used
              </p>
            </div>
            <Download className="h-8 w-8 text-purple-200" />
          </div>
        </div>
      </Card>

      {/* Grouped by Folders */}
      {Object.entries(groupedSongs).map(([folderName, songs]) => (
        <div key={folderName} className="space-y-4">
          <div className="flex items-center gap-3">
            <Folder className="h-6 w-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">{folderName}</h2>
            <Badge variant="secondary" className="bg-slate-700 text-slate-300">
              {songs.length} songs
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {songs.map((song) => (
              <Card key={song.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-colors">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={song.coverImage}
                      alt={song.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">{song.title}</h4>
                      <p className="text-slate-400 text-sm truncate">{song.artist}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                          {song.size}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          {song.downloadedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Button
                      size="sm"
                      onClick={() => onPlaySong(song)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Play
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSong(song.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfflineLibrary;
