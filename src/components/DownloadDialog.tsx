
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Download, FolderPlus } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
}

interface DownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song | null;
  onDownload: (folderName: string, folderImage: string) => void;
}

const DownloadDialog = ({ isOpen, onClose, song, onDownload }: DownloadDialogProps) => {
  const [folderName, setFolderName] = useState('');
  const [folderImage, setFolderImage] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    setIsDownloading(true);
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onDownload(
      folderName.trim(),
      folderImage || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300'
    );
    
    setIsDownloading(false);
    setFolderName('');
    setFolderImage('');
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFolderImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!song) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-purple-400" />
            Download Song
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Song Info */}
          <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
            <img
              src={song.coverImage}
              alt={song.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-medium">{song.title}</h4>
              <p className="text-sm text-slate-400">{song.artist}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Folder Name */}
            <div className="space-y-2">
              <Label htmlFor="folderName">Folder Name</Label>
              <Input
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="e.g., My Favorites, Workout Mix"
                className="bg-slate-800 border-slate-700 text-white"
                required
              />
            </div>

            {/* Folder Image */}
            <div className="space-y-2">
              <Label htmlFor="folderImage">Folder Image (Optional)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="folderImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="bg-slate-800 border-slate-700 text-white file:bg-purple-600 file:text-white file:border-0 file:rounded file:px-3 file:py-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="border-slate-700 text-slate-400 hover:text-white"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {folderImage && (
                <img
                  src={folderImage}
                  alt="Folder preview"
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-slate-700 text-slate-300 hover:text-white"
                disabled={isDownloading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                disabled={isDownloading || !folderName.trim()}
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <FolderPlus className="h-4 w-4 mr-2" />
                    Download
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadDialog;
