"use client";

import { useState, useCallback, ChangeEvent, useEffect, useRef, useId } from 'react';
import Image from 'next/image';
import { UploadCloud, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageUpload: (dataUrl: string | null) => void;
  initialImage?: string | null;
  className?: string;
  aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
}

export function ImageUploader({ 
  onImageUpload, 
  initialImage = null, 
  className,
  aspectRatio = "4/3" // Default to 4:3 aspect ratio
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(initialImage);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const uniqueId = useId();
  const inputId = `image-upload-input-${uniqueId}`;

  useEffect(() => {
    setPreview(initialImage);
  }, [initialImage]);

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        const errorMessage = 'File size exceeds 5MB limit.';
        setError(errorMessage);
        toast({
          title: 'Upload Error',
          description: errorMessage,
          variant: 'destructive',
        });
        setPreview(initialImage); 
        onImageUpload(initialImage); 
        if (inputRef.current) {
          inputRef.current.value = ''; // Reset file input
        }
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
        const errorMessage = 'Invalid file type. Please upload an image (JPEG, PNG, WebP, GIF).';
        setError(errorMessage);
         toast({
          title: 'Upload Error',
          description: errorMessage,
          variant: 'destructive',
        });
        setPreview(initialImage); 
        onImageUpload(initialImage); 
        if (inputRef.current) {
          inputRef.current.value = ''; // Reset file input
        }
        return;
      }
      
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        onImageUpload(dataUrl);
      };
      reader.onerror = () => {
        const errorMessage = 'Failed to read file.';
        setError(errorMessage);
        toast({
          title: 'Upload Error',
          description: errorMessage,
          variant: 'destructive',
        });
        setPreview(initialImage);
        onImageUpload(initialImage); 
        if (inputRef.current) {
          inputRef.current.value = ''; // Reset file input
        }
      };
      reader.readAsDataURL(file);
    } else {
      // If user cancels file dialog, do nothing or revert. Current behavior: do nothing.
      // If revert is needed:
      // setPreview(initialImage); 
      // onImageUpload(initialImage);
    }
  }, [onImageUpload, toast, initialImage]);

  const clearPreview = () => {
    setPreview(null);
    onImageUpload(null); 
    if (inputRef.current) {
      inputRef.current.value = ''; // Reset file input using ref
    }
  };
  
  const [aspectWidth, aspectHeight] = aspectRatio.split('/').map(Number);
  const paddingTop = `${(aspectHeight / aspectWidth) * 100}%`;

  return (
    <div className={cn("w-full", className)}>
      <Label htmlFor={inputId} className={cn(
        "relative block cursor-pointer rounded-lg border-2 border-dashed border-input hover:border-primary transition-colors group",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        error ? "border-destructive" : ""
      )}>
        <div className="relative w-full" style={{ paddingTop }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            {preview ? (
              <>
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-contain rounded-md"
                  data-ai-hint="uploaded image"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 z-10 h-7 w-7 opacity-70 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); clearPreview(); }}
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <UploadCloud className="h-12 w-12 mb-2" />
                <span className="font-semibold">Click to upload or drag & drop</span>
                <span className="text-xs">PNG, JPG, GIF, WebP up to 5MB</span>
              </div>
            )}
          </div>
        </div>
      </Label>
      <Input
        id={inputId}
        ref={inputRef}
        type="file"
        className="sr-only"
        accept="image/png, image/jpeg, image/gif, image/webp"
        onChange={handleFileChange}
      />
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}

