import { useId, useRef, useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase, TIRE_ASSETS_BUCKET } from '../lib/supabase';
import { slugify } from '../lib/slugify';

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  label?: string;
  className?: string;
  previewClassName?: string;
}

const ImageUpload = ({
  value,
  onChange,
  folder = 'misc',
  label,
  className = '',
  previewClassName = 'h-32 w-32 rounded-lg border border-gray-200 object-cover',
}: ImageUploadProps) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file');
      return;
    }

    setUploading(true);
    const ext = file.name.split('.').pop() ?? 'png';
    const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'image';
    const path = `${folder}/${Date.now()}-${base}.${ext}`;

    const { error } = await supabase.storage
      .from(TIRE_ASSETS_BUCKET)
      .upload(path, file, { cacheControl: '3600', upsert: false });

    if (error) {
      setUploading(false);
      toast.error(`Upload failed: ${error.message}`);
      return;
    }

    const { data } = supabase.storage.from(TIRE_ASSETS_BUCKET).getPublicUrl(path);
    setUploading(false);
    onChange(data.publicUrl);
    toast.success('Image uploaded');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={className}>
      {label && <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>}

      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {value ? (
        <div className="relative inline-block">
          <img src={value} alt={label ?? 'preview'} className={previewClassName} />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow hover:bg-red-700"
            aria-label="Remove image"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 text-gray-400 transition-colors hover:border-blue-400 hover:text-blue-500"
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <ImagePlus className="h-6 w-6" />
              <span className="text-xs">Upload</span>
            </>
          )}
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
