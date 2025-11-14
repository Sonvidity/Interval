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

  const handleSelectPlaceholder = (id: string) => {
    setSelectedImageId(id);
    setCustomUrl(""); // Clear custom URL when a placeholder is selected
  };

  const handleSave = async (tab: 'placeholder' | 'custom') => {
    if (tab === 'placeholder') {
        await updateCarPhoto(car.id, { imageId: selectedImageId, customImageUrl: '' });
    } else {
        if (!customUrl) {
            toast({ variant: 'destructive', title: 'Invalid URL', description: 'Please enter a valid image URL.' });
            return;
        }
        await updateCarPhoto(car.id, { imageId: selectedImageId, customImageUrl: customUrl });
    }

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
            Select a new placeholder image or provide your own image URL.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="placeholder" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="placeholder">Select from Library</TabsTrigger>
                <TabsTrigger value="custom">Use Custom URL</TabsTrigger>
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
                 <DialogFooter className="mt-4">
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="button" onClick={() => handleSave('placeholder')}>Save Selection</Button>
                </DialogFooter>
            </TabsContent>
            <TabsContent value="custom">
                <div className="p-4 space-y-4">
                    <Label htmlFor="custom-url">Image URL</Label>
                    <Input 
                        id="custom-url" 
                        value={customUrl} 
                        onChange={(e) => {
                            setCustomUrl(e.target.value)
                            setSelectedImageId('') // Deselect placeholder when typing URL
                        }}
                        placeholder="https://your-image.com/photo.jpg"
                    />
                    {customUrl && (
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
                 <DialogFooter className="mt-4">
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="button" onClick={() => handleSave('custom')} disabled={!customUrl}>Save Custom URL</Button>
                </DialogFooter>
            </TabsContent>
        </Tabs>

      </DialogContent>
    </Dialog>
  );
}
