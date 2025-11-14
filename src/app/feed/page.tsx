'use client';

import { useCollection, useFirestore, useUser } from '@/firebase';
import { collection, query, orderBy, Timestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Post } from '@/lib/types';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { CreatePostDialog } from '@/components/feed/CreatePostDialog';
import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { deleteDoc, doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { WelcomeScreen } from '@/components/garage/WelcomeScreen';

function PostCard({ post }: { post: Post }) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!firestore) return;
    const postRef = doc(firestore, 'posts', post.id);
    try {
      await deleteDoc(postRef);
      toast({ title: 'Post deleted' });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not delete post.' });
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row gap-4 items-center">
        <Avatar>
          <AvatarFallback>{post.authorAvatar}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{post.authorName}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true })}
          </p>
        </div>
        {user?.uid === post.authorId && (
            <div className="ml-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleDelete} className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="aspect-[3/2] relative w-full rounded-lg overflow-hidden border">
          <Image src={post.imageUrl} alt={`Image of ${post.carNickname}`} layout="fill" objectFit="cover" />
        </div>
        <p className="text-foreground/90 whitespace-pre-wrap">{post.text}</p>
      </CardContent>
    </Card>
  );
}


export default function FeedPage() {
  const firestore = useFirestore();
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);
  const { user, loading: userLoading } = useUser();

  const postsQuery = firestore ? query(collection(firestore, 'posts'), orderBy('createdAt', 'desc')) : null;
  const { data: posts, isLoading: postsLoading } = useCollection<Post>(postsQuery);

  const loading = userLoading || postsLoading;

  if (userLoading) {
      return <div className="max-w-xl mx-auto space-y-6"><Skeleton className="h-96 w-full" /></div>;
  }
  
  if (!user) {
    return <WelcomeScreen />;
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-in fade-in-50">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Feed</h1>
        <Button onClick={() => setCreatePostOpen(true)}>Create Post</Button>
      </div>

      {loading && (
        <div className="space-y-6">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      )}

      {!loading && posts?.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">The feed is quiet...</h2>
          <p className="text-muted-foreground mt-2">Be the first to share something about your car!</p>
        </div>
      )}

      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <CreatePostDialog isOpen={isCreatePostOpen} onClose={() => setCreatePostOpen(false)} />
    </div>
  );
}
