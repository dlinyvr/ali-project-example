import { useCallback, useState } from 'react';
import { FileUp, Loader2 } from 'lucide-react';
import { type ProcessingStatus } from '@/types';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface UploadZoneProps {
  onFileSelect: (files: FileList) => Promise<void>;
  accept?: string;
  multiple?: boolean;
}

export function UploadZone({
  onFileSelect,
  accept = '.pdf,.xlsx,.xls,.csv',
  multiple = true,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState<ProcessingStatus>({
    status: 'idle',
    progress: 0,
    message: '',
  });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      if (e.dataTransfer.files) {
        try {
          setProcessing({
            status: 'processing',
            progress: 0,
            message: 'Starting upload...',
          });
          await onFileSelect(e.dataTransfer.files);
          setProcessing({
            status: 'completed',
            progress: 100,
            message: 'Upload complete!',
          });
        } catch (error) {
          setProcessing({
            status: 'error',
            progress: 0,
            message: 'Upload failed. Please try again.',
          });
        }
      }
    },
    [onFileSelect]
  );

  return (
    <div
      className={cn(
        'border-2 border-dashed rounded-lg p-8 transition-colors',
        isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
        'cursor-pointer text-center'
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={(e) => e.target.files && onFileSelect(e.target.files)}
      />
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="rounded-full bg-primary/10 p-4">
          {processing.status === 'processing' ? (
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          ) : (
            <FileUp className="h-8 w-8 text-primary" />
          )}
        </div>
        
        <div className="space-y-2 text-center">
          <h3 className="font-semibold text-lg">
            Drop files here or click to upload
          </h3>
          <p className="text-sm text-muted-foreground">
            Support for PDF, Excel, and CSV files
          </p>
        </div>

        {processing.status !== 'idle' && (
          <div className="w-full max-w-xs space-y-2">
            <Progress value={processing.progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {processing.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}