
import React from 'react';
import { Play, Pause, Heart, Download, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Song {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  duration: number;
  isLiked?: boolean;
  isDownloaded?: boolean;
}

interface SongCardProps {
  song: Song;
  isPlaying?: boolean;
  onPlay: (song: Song) => void;
  onLike: (songId: string) => void;
  onDownload: (song: Song) => void;
}

const SongCard = ({ song, isPlaying, onPlay, onLike, onDownload }: SongCardProps) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="group relative overflow-hidden bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
      <div className="aspect-square relative">
        <img
          src={song.coverImage}
          alt={song.title}
          className="w-full h-full object-cover"
        />
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            size="icon"
            onClick={() => onPlay(song)}
            className="bg-white text-black hover:bg-slate-200 h-12 w-12 rounded-full shadow-lg"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </Button>
        </div>

        {/* Downloaded indicator */}
        {song.isDownloaded && (
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
            <Download className="h-3 w-3" />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-white font-medium truncate mb-1">{song.title}</h3>
        <p className="text-slate-400 text-sm truncate mb-3">{song.artist}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">{formatDuration(song.duration)}</span>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onLike(song.id)}
              className={`h-8 w-8 ${
                song.isLiked 
                  ? 'text-red-500 hover:text-red-400' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Heart className={`h-4 w-4 ${song.isLiked ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDownload(song)}
              className="h-8 w-8 text-slate-400 hover:text-white"
            >
              <Download className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SongCard;
