import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Loader2,
  Upload,
  Trash2,
  Edit2,
  X,
  Check,
  LogOut,
  ArrowLeft,
  Image as ImageIcon,
  GripVertical,
  Save,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Division = 'exhibitions' | 'events' | 'retail' | 'interiors';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string | null;
  project: string | null;
  division: string;
  display_order: number;
}

const divisions: { value: Division; label: string }[] = [
  { value: 'exhibitions', label: 'Exhibitions' },
  { value: 'events', label: 'Events' },
  { value: 'retail', label: 'Retail' },
  { value: 'interiors', label: 'Interiors' },
];

interface SortableImageCardProps {
  image: GalleryImage;
  onEdit: (image: GalleryImage) => void;
  onDelete: (id: string, src: string) => void;
  isEditing: boolean;
  editForm: { alt: string; caption: string; project: string };
  setEditForm: React.Dispatch<React.SetStateAction<{ alt: string; caption: string; project: string }>>;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
}

function SortableImageCard({
  image,
  onEdit,
  onDelete,
  isEditing,
  editForm,
  setEditForm,
  onSaveEdit,
  onCancelEdit,
}: SortableImageCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'bg-card border border-border rounded-lg overflow-hidden',
        isDragging && 'shadow-xl ring-2 ring-primary'
      )}
    >
      <div className="aspect-video relative">
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 z-10 p-1.5 bg-background/80 backdrop-blur-sm rounded cursor-grab active:cursor-grabbing hover:bg-background/90 transition-colors"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            size="icon"
            variant="secondary"
            className="w-8 h-8"
            onClick={() => onEdit(image)}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            className="w-8 h-8"
            onClick={() => onDelete(image.id, image.src)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-xs font-medium">
          #{image.display_order}
        </div>
      </div>

      <div className="p-4">
        {isEditing ? (
          <div className="space-y-2">
            <Input
              value={editForm.alt}
              onChange={(e) => setEditForm((prev) => ({ ...prev, alt: e.target.value }))}
              placeholder="Alt text"
            />
            <Input
              value={editForm.project}
              onChange={(e) => setEditForm((prev) => ({ ...prev, project: e.target.value }))}
              placeholder="Project"
            />
            <Textarea
              value={editForm.caption}
              onChange={(e) => setEditForm((prev) => ({ ...prev, caption: e.target.value }))}
              placeholder="Caption"
              rows={2}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => onSaveEdit(image.id)}>
                <Check className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={onCancelEdit}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            {image.project && (
              <p className="text-xs font-medium text-primary mb-1">
                {image.project}
              </p>
            )}
            <p className="text-sm font-medium line-clamp-1">{image.alt}</p>
            {image.caption && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {image.caption}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function GalleryAdminPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [localImages, setLocalImages] = useState<GalleryImage[]>([]);
  const [hasOrderChanges, setHasOrderChanges] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0, fileName: '' });
  const [selectedDivision, setSelectedDivision] = useState<Division>('exhibitions');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ alt: '', caption: '', project: '' });
  const [dragOver, setDragOver] = useState(false);

  // Bulk upload state
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [bulkSettings, setBulkSettings] = useState({
    project: '',
    division: 'exhibitions' as Division,
  });

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Sync local images with fetched data
  useEffect(() => {
    setLocalImages(images);
    setHasOrderChanges(false);
  }, [images]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('division', selectedDivision)
      .order('display_order', { ascending: true });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setImages(data || []);
    }
    setLoading(false);
  }, [selectedDivision, toast]);

  useEffect(() => {
    if (user) {
      fetchImages();
    }
  }, [user, fetchImages]);

  const validateImage = (file: File): Promise<{ valid: boolean; error?: string }> => {
    return new Promise((resolve) => {
      // Check file size (max 20MB before compression)
      const maxSize = 20 * 1024 * 1024;
      if (file.size > maxSize) {
        resolve({ valid: false, error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max 20MB allowed.` });
        return;
      }

      // Check dimensions
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        if (img.width < 400 || img.height < 400) {
          resolve({ valid: false, error: `Image too small (${img.width}×${img.height}). Minimum 400×400px required.` });
        } else if (img.width > 8000 || img.height > 8000) {
          resolve({ valid: false, error: `Image too large (${img.width}×${img.height}). Maximum 8000×8000px allowed.` });
        } else {
          resolve({ valid: true });
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        resolve({ valid: false, error: 'Invalid image file. Please use JPG, PNG, or WebP.' });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    
    if (files.length === 0) return;

    // Validate all files
    const validFiles: File[] = [];
    for (const file of files) {
      const validation = await validateImage(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        toast({ title: `Skipped: ${file.name}`, description: validation.error, variant: 'destructive' });
      }
    }
    
    if (validFiles.length > 0) {
      setPendingFiles(prev => [...prev, ...validFiles]);
      toast({ title: 'Files Added', description: `${validFiles.length} image(s) ready to upload` });
    }
  }, [toast]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    const validFiles: File[] = [];
    
    for (const file of fileArray) {
      const validation = await validateImage(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        toast({ title: `Skipped: ${file.name}`, description: validation.error, variant: 'destructive' });
      }
    }
    
    if (validFiles.length > 0) {
      setPendingFiles(prev => [...prev, ...validFiles]);
      toast({ title: 'Files Added', description: `${validFiles.length} image(s) ready to upload` });
    }
    
    e.target.value = '';
  };

  const removeFromQueue = (index: number) => {
    setPendingFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearQueue = () => {
    setPendingFiles([]);
  };

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp' as const,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log(`Compressed ${file.name} from ${(file.size / 1024).toFixed(0)}KB to ${(compressedFile.size / 1024).toFixed(0)}KB`);
      return compressedFile;
    } catch (error) {
      console.error('Compression error:', error);
      return file;
    }
  };

  const handleBulkUpload = async () => {
    if (pendingFiles.length === 0) {
      toast({ title: 'No Files', description: 'Add images to upload', variant: 'destructive' });
      return;
    }

    setUploading(true);
    let successCount = 0;
    let failCount = 0;

    // Get current max display order
    const { data: maxOrderData } = await supabase
      .from('gallery_images')
      .select('display_order')
      .eq('division', bulkSettings.division)
      .order('display_order', { ascending: false })
      .limit(1);

    let nextOrder = (maxOrderData?.[0]?.display_order || 0) + 1;

    for (let i = 0; i < pendingFiles.length; i++) {
      const file = pendingFiles[i];
      setUploadProgress({ current: i + 1, total: pendingFiles.length, fileName: file.name });

      try {
        // Compress
        const compressedFile = await compressImage(file);
        
        // Upload to storage
        const fileName = `${bulkSettings.division}/${Date.now()}-${i}.webp`;
        const { error: uploadError } = await supabase.storage
          .from('gallery-photos')
          .upload(fileName, compressedFile, { contentType: 'image/webp' });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('gallery-photos')
          .getPublicUrl(fileName);

        // Insert into database (use filename as alt text)
        const altText = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const { error: insertError } = await supabase.from('gallery_images').insert({
          src: urlData.publicUrl,
          alt: altText,
          caption: null,
          project: bulkSettings.project || null,
          division: bulkSettings.division,
          display_order: nextOrder++,
        });

        if (insertError) throw insertError;
        successCount++;
      } catch (error: any) {
        console.error(`Failed to upload ${file.name}:`, error);
        failCount++;
      }
    }

    setUploading(false);
    setUploadProgress({ current: 0, total: 0, fileName: '' });
    setPendingFiles([]);
    fetchImages();

    if (failCount === 0) {
      toast({ title: 'Success', description: `Uploaded ${successCount} image(s)` });
    } else {
      toast({ 
        title: 'Partial Success', 
        description: `${successCount} uploaded, ${failCount} failed`, 
        variant: 'destructive' 
      });
    }
  };

  const handleDelete = async (id: string, src: string) => {
    if (!confirm('Delete this image?')) return;

    try {
      // Extract path from URL for storage deletion
      const urlParts = src.split('/gallery-photos/');
      if (urlParts.length > 1) {
        await supabase.storage.from('gallery-photos').remove([urlParts[1]]);
      }

      const { error } = await supabase.from('gallery_images').delete().eq('id', id);
      if (error) throw error;

      toast({ title: 'Deleted', description: 'Image removed' });
      fetchImages();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingId(image.id);
    setEditForm({
      alt: image.alt,
      caption: image.caption || '',
      project: image.project || '',
    });
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({
          alt: editForm.alt,
          caption: editForm.caption || null,
          project: editForm.project || null,
        })
        .eq('id', id);

      if (error) throw error;

      toast({ title: 'Updated', description: 'Image metadata saved' });
      setEditingId(null);
      fetchImages();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLocalImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        // Update display_order based on new positions
        return newItems.map((item, index) => ({
          ...item,
          display_order: index,
        }));
      });
      setHasOrderChanges(true);
    }
  };

  const handleSaveOrder = async () => {
    setSavingOrder(true);
    try {
      const updates = localImages.map((image, index) => ({
        id: image.id,
        display_order: index,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('gallery_images')
          .update({ display_order: update.display_order })
          .eq('id', update.id);

        if (error) throw error;
      }

      toast({ title: 'Success', description: 'Display order saved' });
      setHasOrderChanges(false);
      fetchImages();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSavingOrder(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Gallery Manager</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Bulk Upload Images</h2>

              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={cn(
                  'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer mb-4',
                  dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground',
                  pendingFiles.length > 0 && 'border-primary'
                )}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop or click to select
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Multiple images • Auto-compressed to WebP
                </p>
              </div>

              {/* Pending Files Queue */}
              {pendingFiles.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{pendingFiles.length} file(s) ready</span>
                    <Button variant="ghost" size="sm" onClick={clearQueue}>
                      Clear all
                    </Button>
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {pendingFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 bg-muted/50 rounded-lg p-2">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(0)}KB
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-6 h-6 shrink-0"
                          onClick={(e) => { e.stopPropagation(); removeFromQueue(index); }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="division">Division</Label>
                  <Select
                    value={bulkSettings.division}
                    onValueChange={(v) => setBulkSettings((prev) => ({ ...prev, division: v as Division }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.map((d) => (
                        <SelectItem key={d.value} value={d.value}>
                          {d.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="project">Project Name (optional)</Label>
                  <Input
                    id="project"
                    value={bulkSettings.project}
                    onChange={(e) => setBulkSettings((prev) => ({ ...prev, project: e.target.value }))}
                    placeholder="Applied to all images"
                  />
                </div>

                <Button
                  onClick={handleBulkUpload}
                  disabled={uploading || pendingFiles.length === 0}
                  className="w-full"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {uploadProgress.current}/{uploadProgress.total}: {uploadProgress.fileName}
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload {pendingFiles.length > 0 ? `${pendingFiles.length} Image(s)` : 'Images'}
                    </>
                  )}
                </Button>
                {uploading && (
                  <Progress value={(uploadProgress.current / uploadProgress.total) * 100} className="h-1 mt-2" />
                )}
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">
                  {divisions.find((d) => d.value === selectedDivision)?.label} Gallery
                </h2>
                {hasOrderChanges && (
                  <Button
                    size="sm"
                    onClick={handleSaveOrder}
                    disabled={savingOrder}
                  >
                    {savingOrder ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Order
                      </>
                    )}
                  </Button>
                )}
              </div>
              <Select
                value={selectedDivision}
                onValueChange={(v) => setSelectedDivision(v as Division)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {divisions.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasOrderChanges && (
              <p className="text-sm text-muted-foreground mb-4">
                Drag images to reorder, then click "Save Order" to apply changes.
              </p>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : localImages.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No images in this division yet</p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={localImages.map((img) => img.id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    {localImages.map((image) => (
                      <SortableImageCard
                        key={image.id}
                        image={image}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        isEditing={editingId === image.id}
                        editForm={editForm}
                        setEditForm={setEditForm}
                        onSaveEdit={handleSaveEdit}
                        onCancelEdit={() => setEditingId(null)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
