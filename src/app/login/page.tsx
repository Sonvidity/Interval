
"use client";

import { useState } from 'react';
import { useAuth } from '@/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  linkWithCredential,
  EmailAuthProvider,
  signInAnonymously,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase/auth/use-user';
import { FirebaseError } from 'firebase/app';

export default function LoginPage() {
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuthError = (error: FirebaseError) => {
    console.error(error);
    let description = "An unexpected error occurred. Please try again.";
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        description = "Invalid email or password.";
        break;
      case 'auth/email-already-in-use':
        description = "An account with this email already exists.";
        break;
      case 'auth/weak-password':
        description = "The password is too weak. Please use at least 6 characters.";
        break;
      case 'auth/invalid-email':
        description = "Please enter a valid email address.";
        break;
      case 'auth/credential-already-in-use':
        description = "This email is already linked to another account. Try signing in directly.";
        break;
      default:
        description = error.message;
    }
    toast({
      variant: 'destructive',
      title: 'Authentication Failed',
      description,
    });
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true);

    try {
      if (user && user.isAnonymous) {
        // User is anonymous, link the new credentials
        const credential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(user, credential);
        toast({ title: 'Account Created', description: 'Your anonymous account has been converted.' });
      } else {
        // New user sign up
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: 'Account Created', description: 'You have been successfully signed up.' });
      }
      router.push('/');
    } catch (error) {
      handleAuthError(error as FirebaseError);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: 'Signed In', description: 'Welcome back!' });
      router.push('/');
    } catch (error) {
      handleAuthError(error as FirebaseError);
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    if (!auth) return;
    setLoading(true);
    try {
      await signInAnonymously(auth);
      toast({ title: 'Signed In Anonymously', description: 'Your garage will be saved on this device.' });
      router.push('/');
    } catch (error) {
       handleAuthError(error as FirebaseError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Tabs defaultValue="signin" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your garage.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input id="signin-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input id="signin-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{user?.isAnonymous ? "Save Your Garage" : "Create an Account"}</CardTitle>
              <CardDescription>
                {user?.isAnonymous 
                  ? "Create a permanent account to access your garage from any device." 
                  : "Sign up to create your personal garage and save your vehicles."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating Account...' : 'Create Account'}</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
         <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
        </div>
        <div className="mt-6">
            <Button variant="secondary" className="w-full" onClick={handleAnonymousSignIn} disabled={loading}>
              {loading ? 'Loading...' : 'Continue Anonymously'}
            </Button>
        </div>
      </Tabs>
    </div>
  );
}
