"use client";

import { useState } from "react";
import { useGarage } from "@/context/GarageContext";
import { UserCar } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";

interface ChangePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: UserCar;
}

export function ChangePhotoModal({ isOpen, onClose, car }: ChangePhotoModalProps) {
  const { updateCarPhoto } = useGarage();
  const { toast } = useToast();
  
  const [selectedImageId, setSelectedImageId] = useState(car.imageId);
  const [customUrl, setCustomUrl] = useState(car.customImageUrl || "");
  const [activeTab, setActiveTab] = useState("placeholder");

  const handleSelectPlaceholder = (id: string) => {
    setSelectedImageId(id);
    setCustomUrl("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please select an image smaller than 2MB.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCustomUrl(result);
        setSelectedImageId(''); // Deselect placeholder
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSave = async () => {
    let photoData: { imageId: string; customImageUrl?: string } = { imageId: car.imageId, customImageUrl: car.customImageUrl || '' };

    switch (activeTab) {
        case 'placeholder':
            photoData = { imageId: selectedImageId, customImageUrl: '' };
            break;
        case 'url':
        case 'upload':
            if (!customUrl) {
                toast({ variant: 'destructive', title: 'Invalid Image', description: 'Please provide a valid image URL or upload a file.' });
                return;
            }
            // When using a custom image (either URL or upload), we can keep the original imageId as a fallback,
            // but the customUrl takes precedence. Or we can clear it. Let's keep it for now.
            photoData = { imageId: selectedImageId || car.imageId, customImageUrl: customUrl };
            break;
    }
    
    await updateCarPhoto(car.id, photoData);

    toast({
      title: "Photo Updated",
      description: `The photo for ${car.nickname} has been updated.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Change Photo for {car.nickname}</DialogTitle>
          <DialogDescription>
            Select a new placeholder image, upload your own, or provide an image URL.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="placeholder" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="placeholder">Library</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="url">URL</TabsTrigger>
            </TabsList>
            <TabsContent value="placeholder">
                <ScrollArea className="h-96">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {PlaceHolderImages.map((img) => (
                        <button
                        key={img.id}
                        onClick={() => handleSelectPlaceholder(img.id)}
                        className={cn(
                            "rounded-lg overflow-hidden border-4 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                            selectedImageId === img.id && !customUrl ? "border-accent" : "border-transparent"
                        )}
                        >
                        <Image
                            src={img.imageUrl}
                            alt={img.description}
                            width={300}
                            height={200}
                            className="object-cover w-full h-full"
                        />
                        </button>
                    ))}
                    </div>
                </ScrollArea>
            </TabsContent>
            <TabsContent value="upload">
                <div className="p-4 space-y-4 flex flex-col items-center justify-center h-96">
                    <Label htmlFor="file-upload" className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                        <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                        <span className="font-semibold">Click to upload</span>
                        <span className="text-sm text-muted-foreground">PNG, JPG, or WEBP (Max 2MB)</span>
                        <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp"/>
                    </Label>
                    {customUrl && activeTab === 'upload' && (
                        <div className="rounded-lg overflow-hidden border aspect-[3/2] w-full mt-2">
                            <Image 
                                src={customUrl} 
                                alt="Custom image preview" 
                                width={600} 
                                height={400} 
                                className="object-cover w-full h-full"
                                onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1e293b/ffffff?text=Invalid+Image'}
                            />
                        </div>
                    )}
                </div>
            </TabsContent>
            <TabsContent value="url">
                <div className="p-4 space-y-4 h-96">
                    <Label htmlFor="custom-url">Image URL</Label>
                    <Input 
                        id="custom-url" 
                        value={customUrl} 
                        onChange={(e) => {
                            setCustomUrl(e.target.value)
                            setSelectedImageId('')
                        }}
                        placeholder="https://your-image.com/photo.jpg"
                    />
                    {customUrl && activeTab === 'url' && (
                        <div className="rounded-lg overflow-hidden border aspect-[3/2] w-full mt-2">
                            <Image 
                                src={customUrl} 
                                alt="Custom image preview" 
                                width={600} 
                                height={400} 
                                className="object-cover w-full h-full"
                                onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1e293b/ffffff?text=Invalid+Image'}
                            />
                        </div>
                    )}
                </div>
            </TabsContent>
        </Tabs>
        <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="button" onClick={handleSave} disabled={activeTab === 'url' && !customUrl}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
