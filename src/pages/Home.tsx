
import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Clock, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SongCard from '@/components/SongCard';
import Player from '@/components/Player';
import DownloadDialog from '@/components/DownloadDialog';

interface Song {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  duration: number;
  isLiked?: boolean;
  isDownloaded?: boolean;
}

const Home = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadDialog, setDownloadDialog] = useState<{
    isOpen: boolean;
    song: Song | null;
  }>({
    isOpen: false,
    song: null
  });

  useEffect(() => {
    // Mock data - in real app, this would come from your backend
    const mockSongs: Song[] = [
      {
        id: '1',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300',
        duration: 200,
        isLiked: true
      },
      {
        id: '2',
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        coverImage: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300',
        duration: 235
      },
      {
        id: '3',
        title: 'Someone Like You',
        artist: 'Adele',
        coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300',
        duration: 285,
        isLiked: true
      },
      {
        id: '4',
        title: 'Bad Guy',
        artist: 'Billie Eilish',
        coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300',
        duration: 194
      },
      {
        id: '5',
        title: 'Watermelon Sugar',
        artist: 'Harry Styles',
        coverImage: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300',
        duration: 174,
        isDownloaded: true
      },
      {
        id: '6',
        title: 'Levitating',
        artist: 'Dua Lipa',
        coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300',
        duration: 203
      }
    ];
    setSongs(mockSongs);
  }, []);

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const trendingSongs = songs.slice(0, 6);
  const recentSongs = songs.slice(2, 8);
  const likedSongs = songs.filter(song => song.isLiked);

  const handlePlay = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const handleLike = (songId: string) => {
    setSongs(prev => prev.map(song =>
      song.id === songId ? { ...song, isLiked: !song.isLiked } : song
    ));
    
    if (currentSong?.id === songId) {
      setCurrentSong(prev => prev ? { ...prev, isLiked: !prev.isLiked } : null);
    }
  };

  const handleDownload = (song: Song) => {
    setDownloadDialog({ isOpen: true, song });
  };

  const handleDownloadConfirm = (folderName: string, folderImage: string) => {
    if (downloadDialog.song) {
      setSongs(prev => prev.map(song =>
        song.id === downloadDialog.song!.id 
          ? { ...song, isDownloaded: true }
          : song
      ));
      console.log('Downloaded song to folder:', folderName, 'with image:', folderImage);
    }
  };

  const handlePlayerNext = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const handlePlayerPrevious = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong?.id);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentSong(songs[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Discover Music
          </h1>
          <p className="text-slate-400">Stream and download your favorite songs</p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input
            placeholder="Search songs, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 h-12"
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="trending" className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Liked
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchQuery ? filteredSongs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  isPlaying={currentSong?.id === song.id && isPlaying}
                  onPlay={handlePlay}
                  onLike={handleLike}
                  onDownload={handleDownload}
                />
              )) : trendingSongs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  isPlaying={currentSong?.id === song.id && isPlaying}
                  onPlay={handlePlay}
                  onLike={handleLike}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentSongs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  isPlaying={currentSong?.id === song.id && isPlaying}
                  onPlay={handlePlay}
                  onLike={handleLike}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="liked" className="space-y-6">
            {likedSongs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {likedSongs.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    isPlaying={currentSong?.id === song.id && isPlaying}
                    onPlay={handlePlay}
                    onLike={handleLike}
                    onDownload={handleDownload}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Liked Songs</h3>
                <p className="text-slate-400">Start liking songs to see them here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Player */}
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handlePlayerNext}
        onPrevious={handlePlayerPrevious}
        onLike={() => currentSong && handleLike(currentSong.id)}
        onDownload={() => currentSong && handleDownload(currentSong)}
      />

      {/* Download Dialog */}
      <DownloadDialog
        isOpen={downloadDialog.isOpen}
        onClose={() => setDownloadDialog({ isOpen: false, song: null })}
        song={downloadDialog.song}
        onDownload={handleDownloadConfirm}
      />
    </div>
  );
};

export default Home;
