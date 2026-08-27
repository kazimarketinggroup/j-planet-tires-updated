import { useId, useRef, useState } from 'react';
import { FileText, Loader2, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase, TIRE_ASSETS_BUCKET } from '../lib/supabase';
import { slugify } from '../lib/slugify';

interface FileUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  label?: string;
  accept?: string;
  className?: string;
}

const fileNameFromUrl = (url: string) => decodeURIComponent(url.split('/').pop() ?? url);

const FileUpload = ({
  value,
  onChange,
  folder = 'documents',
  label,
  accept = 'application/pdf',
  className = '',
}: FileUploadProps) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    if (accept === 'application/pdf' && file.type !== 'application/pdf') {
      toast.error('Please choose a PDF file');
      return;
    }

    setUploading(true);
    const ext = file.name.split('.').pop() ?? 'pdf';
    const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'document';
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
    toast.success('File uploaded');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={className}>
      {label && <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>}

      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {value ? (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2.5">
          <FileText className="h-5 w-5 shrink-0 text-gray-400" />
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 truncate text-sm text-blue-600 hover:underline"
          >
            {fileNameFromUrl(value)}
          </a>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700"
            aria-label="Remove file"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="flex h-12 w-full max-w-xs cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-3 text-sm text-gray-400 transition-colors hover:border-blue-400 hover:text-blue-500"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? 'Uploading…' : 'Upload PDF'}
        </label>
      )}
    </div>
  );
};

export default FileUpload;
