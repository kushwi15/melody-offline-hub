
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OfflineLibrary from '@/components/OfflineLibrary';
import { useNavigate } from 'react-router-dom';

const Downloads = () => {
  const navigate = useNavigate();

  const handlePlaySong = (song: any) => {
    console.log('Playing offline song:', song);
    // In a real app, this would play the song from IndexedDB
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Downloads
            </h1>
            <p className="text-slate-400">Your offline music library</p>
          </div>
        </div>

        {/* Offline Library */}
        <OfflineLibrary onPlaySong={handlePlaySong} />
      </div>
    </div>
  );
};

export default Downloads;
