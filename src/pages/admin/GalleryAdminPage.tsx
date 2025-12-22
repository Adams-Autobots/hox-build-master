import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

export default function GalleryAdminPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [selectedDivision, setSelectedDivision] = useState<Division>('exhibitions');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ alt: '', caption: '', project: '' });
  const [dragOver, setDragOver] = useState(false);

  // New image form
  const [newImage, setNewImage] = useState({
    file: null as File | null,
    alt: '',
    caption: '',
    project: '',
    division: 'exhibitions' as Division,
  });

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
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      const validation = await validateImage(files[0]);
      if (!validation.valid) {
        toast({ title: 'Invalid Image', description: validation.error, variant: 'destructive' });
        return;
      }
      setNewImage((prev) => ({ ...prev, file: files[0] }));
    }
  }, [toast]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const validation = await validateImage(files[0]);
      if (!validation.valid) {
        toast({ title: 'Invalid Image', description: validation.error, variant: 'destructive' });
        e.target.value = '';
        return;
      }
      setNewImage((prev) => ({ ...prev, file: files[0] }));
    }
  };

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp' as const,
      onProgress: (progress: number) => {
        setCompressionProgress(progress);
      },
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log(`Compressed from ${(file.size / 1024).toFixed(0)}KB to ${(compressedFile.size / 1024).toFixed(0)}KB`);
      return compressedFile;
    } catch (error) {
      console.error('Compression error:', error);
      return file; // Return original if compression fails
    }
  };

  const handleUpload = async () => {
    if (!newImage.file || !newImage.alt) {
      toast({ title: 'Required', description: 'Please add an image and alt text', variant: 'destructive' });
      return;
    }

    setUploading(true);
    setCompressionProgress(0);

    try {
      // Compress image before upload
      toast({ title: 'Optimizing', description: 'Compressing image...' });
      const compressedFile = await compressImage(newImage.file);
      
      // Upload to storage (always use .webp extension for compressed files)
      const fileName = `${newImage.division}/${Date.now()}.webp`;

      const { error: uploadError } = await supabase.storage
        .from('gallery-photos')
        .upload(fileName, compressedFile, {
          contentType: 'image/webp',
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('gallery-photos')
        .getPublicUrl(fileName);

      // Get max display order
      const { data: maxOrderData } = await supabase
        .from('gallery_images')
        .select('display_order')
        .eq('division', newImage.division)
        .order('display_order', { ascending: false })
        .limit(1);

      const nextOrder = (maxOrderData?.[0]?.display_order || 0) + 1;

      // Insert into database
      const { error: insertError } = await supabase.from('gallery_images').insert({
        src: urlData.publicUrl,
        alt: newImage.alt,
        caption: newImage.caption || null,
        project: newImage.project || null,
        division: newImage.division,
        display_order: nextOrder,
      });

      if (insertError) throw insertError;

      const savings = ((1 - compressedFile.size / newImage.file.size) * 100).toFixed(0);
      toast({ title: 'Success', description: `Uploaded! (${savings}% smaller)` });
      setNewImage({ file: null, alt: '', caption: '', project: '', division: selectedDivision });
      fetchImages();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(false);
      setCompressionProgress(0);
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
              <h2 className="text-lg font-semibold mb-4">Upload New Image</h2>

              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={cn(
                  'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer mb-4',
                  dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground',
                  newImage.file && 'border-primary'
                )}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {newImage.file ? (
                  <div className="space-y-2">
                    <img
                      src={URL.createObjectURL(newImage.file)}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground truncate">
                      {newImage.file.name} ({(newImage.file.size / 1024).toFixed(0)}KB)
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Auto-compressed to WebP
                    </p>
                  </>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="division">Division</Label>
                  <Select
                    value={newImage.division}
                    onValueChange={(v) => setNewImage((prev) => ({ ...prev, division: v as Division }))}
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
                  <Label htmlFor="alt">Alt Text *</Label>
                  <Input
                    id="alt"
                    value={newImage.alt}
                    onChange={(e) => setNewImage((prev) => ({ ...prev, alt: e.target.value }))}
                    placeholder="Describe the image"
                  />
                </div>

                <div>
                  <Label htmlFor="project">Project Name</Label>
                  <Input
                    id="project"
                    value={newImage.project}
                    onChange={(e) => setNewImage((prev) => ({ ...prev, project: e.target.value }))}
                    placeholder="e.g., GITEX 2024"
                  />
                </div>

                <div>
                  <Label htmlFor="caption">Caption</Label>
                  <Textarea
                    id="caption"
                    value={newImage.caption}
                    onChange={(e) => setNewImage((prev) => ({ ...prev, caption: e.target.value }))}
                    placeholder="Brief description"
                    rows={2}
                  />
                </div>

                <Button
                  onClick={handleUpload}
                  disabled={uploading || !newImage.file}
                  className="w-full"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {compressionProgress < 100 ? `Compressing ${compressionProgress}%` : 'Uploading...'}
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </>
                  )}
                </Button>
                {uploading && (
                  <Progress value={compressionProgress} className="h-1 mt-2" />
                )}
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                {divisions.find((d) => d.value === selectedDivision)?.label} Gallery
              </h2>
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

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No images in this division yet</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {images.map((image) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-card border border-border rounded-lg overflow-hidden"
                  >
                    <div className="aspect-video relative">
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
                          onClick={() => handleEdit(image)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="w-8 h-8"
                          onClick={() => handleDelete(image.id, image.src)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4">
                      {editingId === image.id ? (
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
                            <Button size="sm" onClick={() => handleSaveEdit(image.id)}>
                              <Check className="w-4 h-4 mr-1" />
                              Save
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
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
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
