'use client';

import { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGarage } from '@/context/GarageContext';
import { useUser } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { VEHICLE_DATABASE } from '@/lib/vehicles';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface CreatePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostDialog({ isOpen, onClose }: CreatePostDialogProps) {
  const { cars, loading: garageLoading } = useGarage();
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [postText, setPostText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCar = useMemo(() => cars.find(c => c.id === selectedCarId), [cars, selectedCarId]);

  useEffect(() => {
    // If dialog is opened, pre-select the first car if available
    if (isOpen && cars.length > 0 && !selectedCarId) {
      setSelectedCarId(cars[0].id);
    }
  }, [isOpen, cars, selectedCarId]);

  const getImageUrl = (car: typeof selectedCar) => {
    if (!car) return '';
    if (car.customImageUrl) return car.customImageUrl;
    const placeholder = PlaceHolderImages.find(img => img.id === car.imageId);
    return placeholder?.imageUrl || 'https://placehold.co/600x400/1e293b/ffffff?text=Image+Not+Found';
  };

  const handleSubmit = async () => {
    if (!user || !firestore || !selectedCar || !postText) {
      toast({ variant: 'destructive', title: 'Missing information', description: 'Please select a car and write a message.' });
      return;
    }
    setIsSubmitting(true);
    try {
      const postData = {
        authorId: user.uid,
        authorName: user.email || 'Anonymous',
        authorAvatar: (user.email || 'A').charAt(0).toUpperCase(),
        carNickname: selectedCar.nickname,
        imageUrl: getImageUrl(selectedCar),
        text: postText,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(firestore, 'posts'), postData);
      toast({ title: 'Post Created!', description: 'Your post is now live on the feed.' });
      onClose();
      setPostText('');
      setSelectedCarId(null);
    } catch (error) {
      console.error('Error creating post:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not create post.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
          <DialogDescription>Share an update about one of your cars with the community.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium">Select a Car</label>
            {garageLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select onValueChange={setSelectedCarId} value={selectedCarId || ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a car from your garage..." />
                </SelectTrigger>
                <SelectContent>
                  {cars.map(car => (
                    <SelectItem key={car.id} value={car.id}>
                      {car.nickname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          {selectedCar && (
            <div>
              <div className="flex justify-between items-center mb-2">
                 <label className="text-sm font-medium">Your Message</label>
              </div>
              <Textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder={`What's new with ${selectedCar.nickname}?`}
                  rows={5}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!selectedCar || !postText || isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post to Feed'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
