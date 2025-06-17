'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Link, Image as ImageIcon, Trash2 } from 'lucide-react';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  images, 
  onImagesChange, 
  maxImages = 10 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList) => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    const newImages: string[] = [];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const result = await response.json();
          newImages.push(result.url);
        } else {
          const error = await response.json();
          alert(`Error uploading ${file.name}: ${error.error}`);
        }
      }
      
      const updatedImages = [...images, ...newImages].slice(0, maxImages);
      onImagesChange(updatedImages);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading files');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlAdd = () => {
    if (urlInput.trim() && images.length < maxImages) {
      const updatedImages = [...images, urlInput.trim()];
      onImagesChange(updatedImages);
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

  const handleRemoveImage = async (index: number) => {
    const imageUrl = images[index];
    
    // If it's a local uploaded file, delete it from server
    if (imageUrl.startsWith('/uploads/')) {
      try {
        const filename = imageUrl.split('/').pop();
        await fetch(`/api/upload?filename=${filename}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
    
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-white/70 text-sm">Images ({images.length}/{maxImages})</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || images.length >= maxImages}
            className="flex items-center gap-1 px-3 py-1 text-xs glass-hover rounded-lg text-white border border-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload size={12} />
            Upload
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            disabled={images.length >= maxImages}
            className="flex items-center gap-1 px-3 py-1 text-xs glass-hover rounded-lg text-white border border-green-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Link size={12} />
            URL
          </button>
        </div>
      </div>

      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        className="hidden"
      />

      {/* URL Input */}
      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter image URL"
            className="flex-1 px-3 py-2 glass rounded-lg text-white text-sm border border-white/20 focus:border-blue-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleUrlAdd}
            disabled={!urlInput.trim()}
            className="px-4 py-2 glass-hover rounded-lg text-white border border-green-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setShowUrlInput(false);
              setUrlInput('');
            }}
            className="px-4 py-2 glass-hover rounded-lg text-white border border-red-400/50"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isUploading 
            ? 'border-blue-400 bg-blue-400/10' 
            : 'border-white/20 hover:border-white/40'
        }`}
      >
        {isUploading ? (
          <div className="text-white/70">
            <Upload className="mx-auto mb-2 animate-pulse" size={24} />
            Uploading...
          </div>
        ) : (
          <div className="text-white/50">
            <ImageIcon className="mx-auto mb-2" size={24} />
            <p className="text-sm">Drag & drop images here or click Upload button</p>
            <p className="text-xs mt-1">Supports: JPG, PNG, GIF, WebP (Max 5MB each)</p>
          </div>
        )}
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/10">
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjEyIiB5PSIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzY2NiIgZm9udC1zaXplPSIxMCI+RXJyb3I8L3RleHQ+Cjwvc3ZnPg==';
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {image.startsWith('/uploads/') ? 'Local' : 'URL'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;